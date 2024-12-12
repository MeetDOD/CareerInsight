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

module.exports = { addCourse,getCourses,getCourseById };
