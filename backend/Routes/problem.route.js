const express = require("express");
const router = express.Router();

const {
  addproblem,
  getproblems,
  getproblem,
  checkCode,
  addproblems,
} = require("../Controller/problem.controller");

router.post("/addproblem", addproblem);
router.get("/getproblems", getproblems);
router.get("/getproblem/:id", getproblem);
router.post("/checkcode", checkCode);
router.post("/addproblems", addproblems);

module.exports = router;
