const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema({
  type: { type: String },
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },
  testCases: [{ input: String, expectedOutput: String }],
});

module.exports = mongoose.model("Problem", ProblemSchema);
