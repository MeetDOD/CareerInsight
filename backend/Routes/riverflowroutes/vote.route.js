const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../../Middlewares/auth.middleware");
const { voteAnswer } = require("../../Controller/riverflow/answer.controller");
const { voteQuestion} = require("../../Controller/riverflow/question.controller");

router.post("/voteanswer", authenticateToken, voteAnswer);
router.post("/votequestion", authenticateToken, voteQuestion);

module.exports = router;