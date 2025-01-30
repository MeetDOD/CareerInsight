const { getIndustryInsights } = require('../jobs/industryInsights');
const express = require('express');
const router = express.Router();
const { authenticateToken } = require("../Middlewares/auth.middleware")

router.get("/", authenticateToken, (req, res) => {
  res.json(getIndustryInsights());
});

module.exports = router;