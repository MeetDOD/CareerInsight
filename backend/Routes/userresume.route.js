const express = require('express');
const router = express.Router();
const { authenticateToken } = require("../Middlewares/auth.middleware");
const { saveResume, getAllResumesByUser, deleteResume } = require('../Controller/userresume.controller');

router.post("/savemyresume", authenticateToken, saveResume);
router.get("/getalluserresume/:userId", authenticateToken, getAllResumesByUser);
router.delete("/deleteuserresume/:resumeId", authenticateToken, deleteResume);

module.exports = router;