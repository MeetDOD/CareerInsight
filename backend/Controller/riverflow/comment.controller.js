const { Comment } = require("../../Models/riverflow.model");

const createComment = async (req, res) => {
    try {
        const { body, questionId, answerId } = req.body;
        const author = req.user.id;

        const newComment = await Comment.create({ body, author, question: questionId, answer: answerId });

        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getComments = async (req, res) => {
    try {
        const { questionId, answerId } = req.query;
        const filter = {};
        if (questionId) filter.question = questionId;
        if (answerId) filter.answer = answerId;

        const comments = await Comment.find(filter).populate("author", "fullName photo");

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createComment, getComments };