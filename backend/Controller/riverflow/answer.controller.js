const { Question, Answer } = require("../../Models/riverflow.model");

const createAnswer = async (req, res) => {
    try {
        const { body, questionId } = req.body;
        const author = req.user.id;

        const question = await Question.findById(questionId);
        if (!question) return res.status(404).json({ error: "Question not found" });

        const newAnswer = await Answer.create({ body, author, question: questionId });

        question.answers.push(newAnswer._id);
        await question.save();

        res.status(201).json(newAnswer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAnswersByQuestion = async (req, res) => {
    try {
        const { questionId } = req.params;
        const answers = await Answer.find({ question: questionId }).populate("author");

        res.status(200).json(answers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const voteAnswer = async (req, res) => {
    try {
        const { answerId, value } = req.body; 
        const answer = await Answer.findById(answerId);

        if (!answer) return res.status(404).json({ error: "Answer not found" });

        answer.votes += value;
        await answer.save();

        res.status(200).json({ message: "Vote updated", votes: answer.votes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createAnswer, getAnswersByQuestion, voteAnswer };