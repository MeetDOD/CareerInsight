const axios = require("axios");
const { InterviewResult } = require("../Models/interview.model");

const fetchCallDetails = async (req, res) => {
  const { call_id, userId } = req.query;
  const phoneNumber = req.query.phone;

  if (!call_id || call_id === "null" || call_id === "undefined") {
    return res.status(400).json({ error: "Invalid Call ID" });
  }

  try {
    const existingResult = await InterviewResult.findOne({ callId: call_id, userId });

    if (existingResult) {
      return res.status(200).json(existingResult);
    }

    const response = await axios.get(`https://api.vapi.ai/call/${call_id}`, {
      headers: {
        Authorization: `Bearer ${process.env.VAPI_API_KEY}`,
      },
    });

    const { summary, analysis } = response.data;

    if (summary && analysis) {
      const result = await InterviewResult.create({
        userId,                
        callId: call_id,
        phoneNumber,
        summary,
        analysis,
      });

      return res.status(200).json(result);
    } else {
      return res.status(200).json({
        message: "Call data is not ready yet. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error fetching call details: ", error);
    return res.status(500).json({ error: "Failed to fetch call details" });
  }
};

const getUserResults = async (req, res) => {
  const { userId } = req.params;

  try {
    const results = await InterviewResult.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching user results: ", error);
    res.status(500).json({ error: "Failed to fetch user results" });
  }
};

module.exports = { fetchCallDetails, getUserResults };