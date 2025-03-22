const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      min: 8,
      required: true,
    },
    otp: {
      type: Number,
    },
    dateofbirth: {
      type: Date,
    },
    gender: {
      type: String,
    },
    photo: {
      type: String,
    },
    phoneno: {
      type: Number,
    },
    address: {
      type: String,
    },
    techstack: {
      type: [String],
    },
    collegename: {
      type: String,
    },
    university: {
      type: String,
    },
    academicyear: {
      type: Number,
    },
    subscribed: {
      type: Boolean,
      default: false,
    },
    resumebuilder: {
      type: Number,
      default: 3,
    },
    mockinterview: {
      type: Number,
      default: 3,
    },
    portfoliobuilder: {
      type: Number,
      default: 3,
    },
    createcourse: {
      type: Number,
      default: 3,
    },
    userType: {
      type: String,
      default: "student",
    },
    portfolioUrl: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      default: "user",
    },
    coursemarks: [
      {
        course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
        marks: { type: Number },
      },
    ],
    enrolledCourses: [
      {
        course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
        enrolledAt: { type: Date, default: Date.now },
        progress: { type: Number, default: 0 },
        activeChapterIndex: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = { User };
