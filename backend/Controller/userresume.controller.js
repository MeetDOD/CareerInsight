const { Resume } = require("../Models/userresume.model");

const saveResume = async (req,res) => {
    const { userId, resumeInfo } = req.body;

    try {
        const newResume = new Resume({
            userId,
            ...resumeInfo,
        });

        await newResume.save();

        res.status(201).json({ message: 'Resume saved successfully', newResume });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
}

const getAllResumesByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const resumes = await Resume.find({ userId });

        res.status(200).json({ resumes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

module.exports = {saveResume,getAllResumesByUser};