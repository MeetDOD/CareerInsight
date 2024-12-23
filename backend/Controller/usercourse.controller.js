const { User } = require('../Models/user.model');
const Course = require('../Models/usercourse.model');

const addCourse = async (req, res) => {
    try {
        const { thumbnail,courseName, category, courseLevel, duration, language, topic, description, chapters } = req.body;
        const userId = req.user._id;

        const newCourse = new Course({
            thumbnail,
            courseName,
            category,
            courseLevel,
            duration,
            language,
            topic,
            description,
            chapters,
            createdBy: userId,
        });

        await newCourse.save();
        res.status(201).json({ message: 'Course added successfully', course: newCourse });
    } catch (error) {
        console.error('Error adding course:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json({ courses });
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id);
        
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json({ course });
    } catch (error) {
        console.error('Error fetching course by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const enrollInCourse = async (req, res) => {
    try {
        const userId = req.user._id;
        const { courseId } = req.body;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const alreadyEnrolled = user.enrolledCourses.some(enrolled => enrolled.course.equals(courseId));
        if (alreadyEnrolled) {
            return res.status(400).json({ message: 'This Course is already enrolled' });
        }

        user.enrolledCourses.push({ course: courseId });
        await user.save();

        res.status(200).json({ message: 'Enrolled in course successfully', enrolledCourses: user.enrolledCourses });
    } catch (error) {
        console.error('Error enrolling in course:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId).populate('enrolledCourses.course');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ enrolledCourses: user.enrolledCourses });
    } catch (error) {
        console.error('Error fetching enrolled courses:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateProgress = async (req, res) => {
    try {
        const userId = req.user._id;
        const { courseId, progress, activeChapterIndex } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const course = user.enrolledCourses.find(enrolled => enrolled.course.toString() === courseId);
        if (!course) {
            return res.status(404).json({ message: 'User is not enrolled in this course' });
        }

        course.progress = progress;
        course.activeChapterIndex = activeChapterIndex + 1;

        await user.save();

        res.status(200).json({ 
            message: 'Progress updated successfully', 
            progress: course.progress, 
            activeChapterIndex: course.activeChapterIndex
        });
    } catch (error) {
        console.error('Error updating progress:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getRecommendedCourses = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userTechStack = user.techstack;

        if (!userTechStack || userTechStack.length === 0) {
            return res.status(400).json({ message: 'Tech stack is empty or not defined.' });
        }

        const queryConditions = userTechStack.flatMap(stack => [
            { description: { $regex: stack, $options: 'i' } },
            { courseName: { $regex: stack, $options: 'i' } },
            { category: { $regex: stack, $options: 'i' } },
            { topic: { $regex: stack, $options: 'i' } },
        ]);

        const recommendedCourses = await Course.find({
            $or: queryConditions,
        });

        if (recommendedCourses.length === 0) {
            return res.status(404).json({ message: 'No recommended courses found.' });
        }

        res.status(200).json({ recommendedCourses });
    } catch (error) {
        console.error('Error fetching recommended courses:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = { addCourse,getCourses,getCourseById,getEnrolledCourses,enrollInCourse,updateProgress,getRecommendedCourses };
