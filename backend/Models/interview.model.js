const mongoose = require("mongoose");

const interviewResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  callId: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  summary: { type: String },
  analysis: { type: Object },
  createdAt: { type: Date, default: Date.now }
});

const InterviewResult = mongoose.model("InterviewResult", interviewResultSchema);

module.exports = { InterviewResult };