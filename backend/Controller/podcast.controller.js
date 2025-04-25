const axios = require("axios");
const fs = require("fs");
const path = require("path");
const os = require("os");
const { promisify } = require("util");
const { uploadToCloudinary } = require("../Config/cloudinary");
const { chatSession } = require("../jobs/geminiModel");
const { Podcast } = require("../Models/podcast.model");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const ffprobePath = require("ffprobe-static").path;

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);
const writeFile = promisify(fs.writeFile);

const fetchGradientImage = async () => {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=galaxy+night+sky+stars&image_type=photo&safesearch=true&per_page=50`
    );
    if (response.data.hits && response.data.hits.length > 0) {
      const randomImage =
        response.data.hits[
          Math.floor(Math.random() * response.data.hits.length)
        ];
      return randomImage.largeImageURL;
    }
    return null;
  } catch (err) {
    return null;
  }
};

const addPauses = (text) => {
  return text
    .replace(/\./g, ". ")
    .replace(/,/g, ", ")
    .replace(/ and /g, " ... and ")
    .replace(/\? /g, "? ... ");
};

const sanitizeTextForTTS = (text) =>
  text
    .replace(/\*/g, "")
    .replace(/[^a-zA-Z0-9.,'?!\s]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 250);

const elevenLabsVoices = {
  Rachel: "EXAVITQu4vr4xnSDxMaL",
  Domi: "21m00Tcm4TlvDq8ikWAM",
  Bella: "AZnzlk1XvdvUeBnXmlld",
  Antoni: "ErXwobaYiN019PkySvjV",
  Elli: "MF3mGyEYCl7XYWbV9V6O",
  Josh: "TxGEqnHWrfWFTfGW9XjX",
  Arnold: "VR6AewLTigWG4xSOukaG",
};

const generateAudioWithAxios = async (text, voiceId) => {
  const apiKey = process.env.ELEVENLABS_API_KEY;

  const pacedText = text
    .replace(/,/g, ", ")
    .replace(/\./g, ". ")
    .replace(/ and /gi, " ... and ");

  const response = await axios.post(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`,
    {
      text: pacedText,
      model_id: "eleven_multilingual_v2",
      voice_settings: {
        stability: 0.35,
        similarity_boost: 0.85,
      },
    },
    {
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
      },
      responseType: "stream",
      timeout: 20000,
    }
  );

  const chunks = [];
  return new Promise((resolve, reject) => {
    response.data.on("data", (chunk) => chunks.push(chunk));
    response.data.on("end", () => resolve(Buffer.concat(chunks)));
    response.data.on("error", reject);
  });
};

const createPodcast = async (req, res) => {
  try {
    console.log("Starting podcast generation...");
    const { topic, voice1, voice2, id: userId } = req.body;

    if (!topic || !voice1 || !voice2 || !userId) {
      return res
        .status(400)
        .json({ message: "Missing required fields in the request." });
    }

    if (!elevenLabsVoices[voice1] || !elevenLabsVoices[voice2]) {
      return res.status(400).json({
        message: "Invalid voices. Choose from Rachel, Domi, Bella, or Antoni.",
      });
    }

    console.log("Generating conversation from Gemini...");
    const prompt = `Generate a short and friendly podcast conversation between two hosts. 
    Host1 speaks like ${voice1}, Host2 speaks like ${voice2}. 
    start with hey welcome to careerinsights podcast and then talk about the
    Topic: "${topic}". Mark lines with 'Host1:' or 'Host2:'. 
    Keep it concise with around 14 to 15 lines total only, each line less than 200 characters.`;

    const result = await chatSession.sendMessage(prompt);
    const conversation = result.response.text();

    console.log("Conversation received:\n", conversation);

    const lines = conversation
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.startsWith("Host1:") || line.startsWith("Host2:"));

    console.log(`Total lines to generate: ${lines.length}`);
    console.log("Starting audio generation line by line...");

    const tempAudioFiles = [];

    const generateAudioForLine = async (
      text,
      voiceId,
      lineIndex,
      attempt = 1
    ) => {
      const safeText = addPauses(sanitizeTextForTTS(text));
      if (!safeText || safeText.length < 2) {
        console.warn(`Line ${lineIndex} text too short or invalid, skipping.`);
        return null;
      }
      console.log(
        `Generating audio for line ${lineIndex} (attempt ${attempt}): "${safeText}"`
      );
      try {
        const audioBuffer = await generateAudioWithAxios(safeText, voiceId);
        const tempFilePath = path.join(
          os.tmpdir(),
          `line_${lineIndex}_${Date.now()}.mp3`
        );
        await writeFile(tempFilePath, audioBuffer);
        return tempFilePath;
      } catch (err) {
        console.error(
          `Error on line ${lineIndex}, attempt ${attempt}: ${err.message}`
        );
        if (attempt < 2) {
          console.log(`Retrying line ${lineIndex}...`);
          return generateAudioForLine(text, voiceId, lineIndex, attempt + 1);
        } else {
          console.error(`Line ${lineIndex} failed after 2 attempts.`);
          return null;
        }
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const isHost1 = line.startsWith("Host1:");
      const text = line.replace("Host1:", "").replace("Host2:", "").trim();
      const voiceId = isHost1
        ? elevenLabsVoices[voice1]
        : elevenLabsVoices[voice2];
      const filePath = await generateAudioForLine(text, voiceId, i);
      if (filePath) {
        tempAudioFiles.push(filePath);
      }
    }

    if (tempAudioFiles.length === 0) {
      throw new Error("No audio was successfully generated.");
    }

    console.log("Merging all audio files...");
    const mergedFilePath = path.join(
      os.tmpdir(),
      `podcast_merged_${Date.now()}.mp3`
    );

    await new Promise((resolve, reject) => {
      const merger = ffmpeg();
      tempAudioFiles.forEach((file) => merger.input(file));
      merger.on("end", resolve).on("error", reject).mergeToFile(mergedFilePath);
    });

    console.log("Uploading merged audio to Cloudinary...");
    const audioUrl = await uploadToCloudinary(mergedFilePath);

    console.log("Saving podcast in database...");
    const newPodcast = await Podcast.create({
      topic,
      user: userId,
      voice1,
      voice2,
      audioUrl,
      conversation,
    });

    [...tempAudioFiles, mergedFilePath].forEach((file) => fs.unlinkSync(file));

    console.log("Podcast generation complete!");

    return res.status(201).json({
      message: "Podcast generated successfully!",
      podcast: newPodcast,
    });
  } catch (error) {
    console.error("Error generating podcast:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getAllPodcasts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    const podcasts = await Podcast.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Podcast.countDocuments();

    res.status(200).json({
      success: true,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      podcasts,
    });
  } catch (error) {
    console.error("Error fetching podcasts:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { createPodcast, getAllPodcasts };
