const express = require('express');
const router = express.Router();
const { authenticateToken } = require("../Middlewares/auth.middleware");
const { saveResume } = require('../Controller/userresume.controller');

router.post('/savemyresume', authenticateToken, saveResume);

module.exports = router;