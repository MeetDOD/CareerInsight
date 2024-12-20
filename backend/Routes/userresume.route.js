const express = require('express');
const router = express.Router();
const { authenticateToken } = require("../Middlewares/auth.middleware");
const { saveResume, getAllResumesByUser } = require('../Controller/userresume.controller');

router.post("/savemyresume", authenticateToken, saveResume);
router.get("/getalluserresume/:userId", authenticateToken, getAllResumesByUser);

module.exports = router;