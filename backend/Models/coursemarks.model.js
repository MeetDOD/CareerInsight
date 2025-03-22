const mongoose = require("mongoose");

const quizResultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  questions: [
    {
      questionText: { type: String, required: true },
      options: { type: [String], required: true },
      correctAnswer: { type: String, required: true },
      userAnswer: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("QuizResult", quizResultSchema);
