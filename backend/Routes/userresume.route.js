const express = require('express');
const router = express.Router();
const { authenticateToken } = require("../Middlewares/auth.middleware");
const { saveResume, getAllResumesByUser, deleteResume, getResumeById } = require('../Controller/userresume.controller');

router.post("/savemyresume", authenticateToken, saveResume);
router.get("/getalluserresume/:userId", authenticateToken, getAllResumesByUser);
router.delete("/deleteuserresume/:resumeId", authenticateToken, deleteResume);
router.get("/getuserresumebyid/:resumeId", getResumeById);

module.exports = router;