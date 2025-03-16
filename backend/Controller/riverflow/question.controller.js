const { Question, Answer } = require("../../Models/riverflow.model");

const createQuestion = async (req, res) => {
    try {
        const { title, body, tags } = req.body;
        const author = req.user.id;

        const newQuestion = await Question.create({ title, body, tags, author });
        res.status(201).json(newQuestion);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
};

const getQuestions = async (req, res) => {
    try {
        const questions = await Question.find().populate("author","fullName photo",).sort({ createdAt: -1 });
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getQuestionById = async (req, res) => {
    try {
        const { id } = req.params;
        const question = await Question.findById(id).populate("author", "fullName photo").populate("answers");

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

        if (question.author.toString() !== req.user.id) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        if (question.acceptedAnswer?.toString() === answerId) {
            question.isResolved = false;
            question.acceptedAnswer = null;
            await Answer.findByIdAndUpdate(answerId, { isAccepted: false });
            await question.save();

            return res.status(200).json({ message: "Answer unaccepted", acceptedAnswer: null });
        } else {
            if (question.acceptedAnswer) {
                await Answer.findByIdAndUpdate(question.acceptedAnswer, { isAccepted: false });
            }

            question.isResolved = true;
            question.acceptedAnswer = answerId;
            await Answer.findByIdAndUpdate(answerId, { isAccepted: true });
            await question.save();

            return res.status(200).json({ message: "Answer accepted", acceptedAnswer: answerId });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const voteQuestion = async (req, res) => {
    const { questionId, value } = req.body;
    const userId = req.user.id;

    if (![1, -1].includes(value)) {
        return res.status(400).json({ error: "Invalid vote value" });
    }

    try {
        const question = await Question.findById(questionId);
        if (!question) return res.status(404).json({ error: "Question not found" });

        const existingVote = question.voters.find(vote => vote.userId.toString() === userId);

        if (existingVote) {
            if (existingVote.value === value) {
                question.voters = question.voters.filter(vote => vote.userId.toString() !== userId);
                question.votes -= value;
            } else {
                existingVote.value = value;
                question.votes += 2 * value; 
            }
        } else {
            question.voters.push({ userId, value });
            question.votes += value;
        }

        await question.save();

        res.json({ votes: question.votes, userVote: existingVote ? existingVote.value : null });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { createQuestion, getQuestions, getQuestionById, deleteQuestion, acceptAnswer,voteQuestion };