const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    tags: [{ type: String }], 
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
    votes: { type: Number, default: 0 },
    voters: [{ userId: mongoose.Schema.Types.ObjectId, value: Number }],
    views: { type: Number, default: 0 },
    isResolved: { type: Boolean, default: false },
    acceptedAnswer: { type: mongoose.Schema.Types.ObjectId, ref: 'Answer', default: null }
}, { timestamps: true });

const answerSchema = new mongoose.Schema({
    body: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    votes: { type: Number, default: 0 },
    isAccepted: { type: Boolean, default: false }
}, { timestamps: true });

const commentSchema = new mongoose.Schema({
    body: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', default: null },
    answer: { type: mongoose.Schema.Types.ObjectId, ref: 'Answer', default: null }
}, { timestamps: true });

const voteSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', default: null },
    answer: { type: mongoose.Schema.Types.ObjectId, ref: 'Answer', default: null },
    value: { type: Number, enum: [1, -1], required: true }
}, { timestamps: true });

const Question = mongoose.model("Question", questionSchema);
const Answer = mongoose.model("Answer", answerSchema);
const Comment = mongoose.model("Comment", commentSchema);
const Vote = mongoose.model("Vote", voteSchema);

module.exports = { Question, Answer, Comment, Vote };