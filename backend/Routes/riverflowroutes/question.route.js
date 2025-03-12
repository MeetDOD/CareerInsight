const express = require("express");
const { createQuestion, getQuestions, getQuestionById, deleteQuestion, acceptAnswer, } = require("../../Controller/riverflow/question.controller");
const { authenticateToken } = require("../../Middlewares/auth.middleware");
const router = express.Router();

router.post("/", authenticateToken, createQuestion); 
router.get("/", getQuestions);
router.get("/:id", getQuestionById);               
router.delete("/:id", authenticateToken, deleteQuestion); 
router.post("/accept", authenticateToken, acceptAnswer); 

module.exports = router;