const express = require("express");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { User } = require("../Models/user.model");
const { OTP } = require("../Models/otp.model"); // Import the OTP model
const router = express.Router();
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const linkedIn = require("linkedin-jobs-api");
const QuizResult = require("../Models/coursemarks.model");
const axios = require("axios");

dotenv.config();

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
};

const sendOTP = async (email, generatedOTP) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "OTP for Verification",
      text: `Here is Your OTP for Verifying your Email: ${generatedOTP}`,
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const register = async (req, res) => {
  try {
    const { password, email, fullName } = req.body;

    if (!password || !email || !fullName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const otp = generateOTP();
    const otpSent = await sendOTP(email, otp);

    if (!otpSent) {
      return res.status(500).json({ message: "Failed to send OTP Try again" });
    }

    // Store the OTP in the OTP collection
    await OTP.findOneAndUpdate(
      { email },
      { otp, otpExpires: Date.now() + 300000 }, // 5 minutes expiration
      { upsert: true, new: true }
    );
    res.status(200).json({ message: "OTP sent for email verification" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, enteredOTP, password, fullName } = req.body;
    console.log(req.body);

    const otpRecord = await OTP.findOne({ email });

    if (!otpRecord) {
      return res.status(400).json({ message: "session expired try gaian" });
    }
    if (otpRecord.otp != enteredOTP) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (otpRecord.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const initials = `${email.charAt(0)}`.toUpperCase();
    const photo = `https://ui-avatars.com/api/?name=${initials}&size=150&background=ffffff&color=7c3aed`;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      fullName,
      photo,
    });

    await newUser.save();

    // Delete OTP record after successful verification
    await OTP.deleteOne({ email });

    res
      .status(200)
      .json({ message: "User verified and registered successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    const userDetailsIncomplete =
      !user.phoneno ||
      !user.gender ||
      !user.dateofbirth ||
      !user.collegename ||
      !user.university ||
      !user.academicyear ||
      !user.address ||
      !user.techstack;

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        photo: user.photo,
        phoneno: user.phoneno ? user.phoneno : null,
      },
      userDetailsIncomplete,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    console.log(req.user);
    const allowedUpdates = [
      "username",
      "fullName",
      "phoneno",
      "gender",
      "dateofbirth",
    ];
    const updates = {};

    // Only allow specific fields to be updated
    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const photo = req.files?.profilePhoto;

    // Find the user by ID and update only allowed fields
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates }, // Only update fields that are allowed
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Handle profile photo update if a new photo is provided
    if (photo) {
      if (user.photo) {
        await cloudinary.uploader.destroy(user.photo); // Delete old photo from Cloudinary
      }
      const photoUploadResult = await cloudinary.uploader.upload(
        photo.tempFilePath
      );
      user.photo = photoUploadResult.secure_url;
    }

    await user.save(); // Save the updated user data if needed
    const userdata = {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      photo: user.photo,
      gender: user.gender,
      phoneno: user.phoneno,
    };

    res
      .status(200)
      .json({ message: "Profile updated successfully", user: userdata });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const adduserdetail = async (req, res) => {
  try {
    const {
      phoneno,
      gender,
      dateofbirth,
      collegename,
      university,
      academicyear,
      address,
      techstack,
    } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.phoneno = phoneno;
    user.gender = gender;
    user.dateofbirth = dateofbirth;
    user.collegename = collegename;
    user.university = university;
    user.academicyear = academicyear;
    user.address = address;
    user.techstack = techstack;

    const userdetails = {
      phoneno: user.phoneno,
      email: user.email,
      fullName: user.fullName,
      photo: user.photo,
      _id: user._id,
    };

    await user.save();

    res
      .status(200)
      .json({ message: "Your details added successfully", user: userdetails });
  } catch (error) {
    console.error("Error adding extra data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getalluser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error getting all user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getuserbyid = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error getting user by id:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deployPortfolio = async (req, res) => {
  try {
    const { html, css, username } = req.body;
    const userId = req.user.id;

    if (!html || !css || !username) {
      return res.status(400).json({ message: "Missing data" });
    }

    const path = `./deployments/${username}`;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }

    const tailwindCDN = `<script src="https://cdn.tailwindcss.com"></script>`;
    const finalHtml = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${username}'s Portfolio</title>
                ${tailwindCDN}
            </head>
            <body>
                ${html}
            </body>
            </html>
        `;

    fs.writeFileSync(`${path}/index.html`, finalHtml);
    const portfolioUrl = `/${username}`;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.portfolioUrl) {
      user.portfolioUrl = portfolioUrl;
      await user.save();
    }

    res.status(200).json({
      message: "Portfolio deployed successfully!",
      url: portfolioUrl,
    });
  } catch (error) {
    console.error("Error in deploying user portfolio:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const fetchJobs = async (req, res) => {
  try {
    const {
      location,
      keyword = "software engineer",
      dateSincePosted = "24hr",
      limit = 40,
    } = req.body;

    if (!location) {
      return res.status(400).json({ error: "Location is required" });
    }

    const queryOptions = {
      keyword,
      location,
      dateSincePosted,
      limit: String(limit),
    };

    const jobs = await linkedIn.query(queryOptions);
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};

const fetchJobsByCourse = async (req, res) => {
  try {
    const {
      location,
      dateSincePosted = "24hr",
      limit = 6,
      courseCategory,
    } = req.body;

    if (!location || !courseCategory) {
      return res
        .status(400)
        .json({ error: "Location and course category are required" });
    }

    const keyword = courseCategory.toLowerCase();

    const queryOptions = {
      keyword,
      location,
      dateSincePosted,
      limit: String(limit),
    };

    const jobs = await linkedIn.query(queryOptions);
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};

const checktrails = async (req, res) => {
  try {
    const user = req.user;
    const pagename = req.params.pagename;
    console.log("pagename", pagename);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.subscribed) {
      return res.status(200).json({ message: "You are subscribed user" });
    }

    if (pagename === "resumebuilder") {
      if (user.resumebuilder === 0) {
        return res
          .status(400)
          .json({ message: "You have used all your trials" });
      }
      user.resumebuilder -= 1;
    } else if (pagename === "mockinterview") {
      if (user.mockinterview === 0) {
        return res
          .status(400)
          .json({ message: "You have used all your trials" });
      }
      user.mockinterview -= 1;
    } else if (pagename === "portfoliobuilder") {
      if (user.portfoliobuilder === 0) {
        return res
          .status(400)
          .json({ message: "You have used all your trials" });
      }
      user.portfoliobuilder -= 1;
    } else if (pagename === "createcourse") {
      if (user.createcourse === 0) {
        return res
          .status(400)
          .json({ message: "You have used all your trials" });
      }
      user.createcourse -= 1;
    } else {
      return res.status(400).json({ message: "Invalid page name" });
    }
    await user.save();
    res.status(200).json({ message: "Trial used successfully" });
  } catch (error) {
    console.error("Error getting user by id:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const savecoursemarks = async (req, res) => {
  try {
    const { courseid, answers, questions } = req.body;
    const userId = req.user.id; // Assuming user is authenticated and attached to req

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    let score = 0;
    const processedQuestions = questions.map((q) => {
      const userAnswer = answers[q.id] || "";
      const isCorrect = userAnswer === q.correct;
      if (isCorrect) score += 1;

      return {
        questionText: q.question,
        options: q.options,
        correctAnswer: q.correct,
        userAnswer,
        isCorrect,
      };
    });

    const quizResult = new QuizResult({
      user: userId,
      course: courseid,
      score,
      totalQuestions: questions.length,
      questions: processedQuestions,
    });

    await quizResult.save();

    res.status(200).json({ message: "Quiz results saved successfully", score });
  } catch (error) {
    console.error("Error saving quiz results:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getquizresults = async (req, res) => {
  try {
    const userId = req.user._id;
    const quizResults = await QuizResult.find({ user: userId })
      .populate("course")
      .sort({ createdAt: -1 });

    res.status(200).json({ quizResults });
  } catch (error) {
    console.error("Error fetching quiz results:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const fetchleetcodequestions = async (req, res) => {
  try {
    const response = await axios.get("https://leetcode.com/api/problems/all/");
    const allQuestions = response.data.stat_status_pairs;

    // Extract 20 free questions (no "paid_only" flag)
    const freeQuestions = allQuestions
      .filter((q) => !q.paid_only) // Only free questions
      .slice(0, 20) // Get first 20
      .map((q) => ({
        title: q.stat.question__title,
        difficulty:
          q.difficulty.level === 1
            ? "Easy"
            : q.difficulty.level === 2
            ? "Medium"
            : "Hard",
        url: `https://leetcode.com/problems/${q.stat.question__title_slug}/`,
      }));

    res.json(freeQuestions);
  } catch (error) {
    console.error("Error fetching LeetCode data:", error);
    res.status(500).json({ message: "Error fetching data" });
  }
};

const leaderboard = async (req, res) => {
  try {
    const quizResults = await QuizResult.aggregate([
      {
        $group: {
          _id: "$user",
          uniqueCourses: { $addToSet: "$course" }, // Get unique courses completed
          totalScore: { $sum: "$score" }, // Sum the scores from quizzes
        },
      },
      {
        $addFields: {
          courseScore: { $multiply: [{ $size: "$uniqueCourses" }, 10] }, // Add 10 points per course
          user: "$_id",
        },
      },
      {
        $project: {
          _id: 0,
          user: 1,
          totalScore: { $add: ["$totalScore", "$courseScore"] }, // Combine total scores
          completedCourses: { $size: "$uniqueCourses" }, // Count unique courses
        },
      },
      {
        $sort: { completedCourses: -1, totalScore: -1 }, // Sort by courses completed, then by score
      },
      {
        $limit: 10, // Get top 10 users
      },
    ]);

    const users = await User.find({
      _id: { $in: quizResults.map((q) => q.user) },
    })
      .select("fullName photo")
      .lean();

    const leaderboard = quizResults.map((result) => ({
      user: users.find((u) => u._id.equals(result.user)),
      completedCourses: result.completedCourses,
      score: result.totalScore,
    }));

    res.status(200).json({ leaderboard });
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  register,
  verifyOTP,
  login,
  updateProfile,
  getalluser,
  getuserbyid,
  adduserdetail,
  deployPortfolio,
  fetchJobs,
  checktrails,
  fetchJobsByCourse,
  savecoursemarks,
  getquizresults,
  fetchleetcodequestions,
  leaderboard,
};
