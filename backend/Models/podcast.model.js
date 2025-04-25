const mongoose = require("mongoose");

const podcastSchema = new mongoose.Schema(
  {
    topic: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    voice1: { type: String, required: true },
    voice2: { type: String, required: true },
    audioUrl: { type: String, required: true },
    conversation: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Podcast = mongoose.model("Podcast", podcastSchema);

module.exports = { Podcast };
