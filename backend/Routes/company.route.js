const express = require("express");
const router = express.Router();
const {
  createcompanydetails,
  getcompanydetails,
  getcompanydetail,
  updatecompanydetails,
  deletecompanydetails,
} = require("../Controller/admin.controller");

const {
  isAdmin,
  authenticateToken,
} = require("../Middlewares/auth.middleware");

router.post("/createcompanydetails", isAdmin, createcompanydetails);
router.get("/getcompanydetails", authenticateToken, getcompanydetails);
router.get("/getcompanydetail/:id", authenticateToken, getcompanydetail);
router.patch("/updatecompanydetails/:id", isAdmin, updatecompanydetails);
router.delete("/deletecompanydetails/:id", isAdmin, deletecompanydetails);

module.exports = router;
