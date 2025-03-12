const { Question, Answer } = require("../../Models/riverflow.model");

const createQuestion = async (req, res) => {
    try {
        const { title, body, tags } = req.body;
        const author = req.user.id;

        const newQuestion = await Question.create({ title, body, tags, author });
        res.status(201).json(newQuestion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getQuestions = async (req, res) => {
    try {
        const questions = await Question.find().populate("author", "username").sort({ createdAt: -1 });
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getQuestionById = async (req, res) => {
    try {
        const { id } = req.params;
        const question = await Question.findById(id).populate("author", "username").populate("answers");

        if (!question) return res.status(404).json({ error: "Question not found" });

        question.views += 1;
        await question.save();

        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const question = await Question.findById(id);

        if (!question) return res.status(404).json({ error: "Question not found" });
        if (question.author.toString() !== req.user.id) return res.status(403).json({ error: "Unauthorized" });

        await question.deleteOne();
        res.status(200).json({ message: "Question deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const acceptAnswer = async (req, res) => {
    try {
        const { questionId, answerId } = req.body;
        const question = await Question.findById(questionId);

        if (!question) return res.status(404).json({ error: "Question not found" });
        if (question.author.toString() !== req.user.id) return res.status(403).json({ error: "Unauthorized" });

        question.isResolved = true;
        question.acceptedAnswer = answerId;
        await question.save();

        await Answer.findByIdAndUpdate(answerId, { isAccepted: true });

        res.status(200).json({ message: "Answer marked as accepted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const voteQuestion = async (req, res) => {
    try {
        const { questionId, value } = req.body; 
        const question = await Question.findById(questionId);
        if (!question) return res.status(404).json({ error: "Question not found" });

        question.votes += value;
        await question.save();

        res.status(200).json({ message: "Vote updated", votes: question.votes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createQuestion, getQuestions, getQuestionById, deleteQuestion, acceptAnswer,voteQuestion };