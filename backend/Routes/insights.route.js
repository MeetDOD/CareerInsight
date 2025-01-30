const { getIndustryInsights } = require('../jobs/industryInsights');
const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  res.json(getIndustryInsights());
});

module.exports = router;