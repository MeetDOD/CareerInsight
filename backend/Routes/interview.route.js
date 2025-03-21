const express = require("express");
const { fetchCallDetails, getUserResults } = require("../Controller/interview.controller");
const router = express.Router();
const { authenticateToken } = require("../Middlewares/auth.middleware")

router.get("/call-details",authenticateToken, fetchCallDetails);
router.get("/user-feedback/:userId",authenticateToken, getUserResults);

module.exports = router;