const express = require("express");
const { authenticateToken } = require("../../Middlewares/auth.middleware");
const { createAnswer, getAnswersByQuestion, voteAnswer } = require("../../Controller/riverflow/answer.controller");
const router = express.Router();

router.post("/", authenticateToken, createAnswer);  
router.get("/:questionId", getAnswersByQuestion); 
router.post("/vote", authenticateToken, voteAnswer); 

module.exports = router;