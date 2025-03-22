const express = require("express");
const router = express.Router();

const {
  addproblem,
  getproblems,
  getproblem,
  checkCode,
} = require("../Controller/problem.controller");

router.post("/addproblem", addproblem);
router.get("/getproblems", getproblems);
router.get("/getproblem/:id", getproblem);
router.post("/checkcode", checkCode);

module.exports = router;
