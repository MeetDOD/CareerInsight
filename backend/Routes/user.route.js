const express = require('express');
const router = express.Router();
const { register, login, updateProfile, verifyOTP, getalluser, getuserbyid } = require("../Controller/user.controller");
const { authenticateToken } = require("../Middlewares/auth.middleware")

router.post("/register", register);
router.post("/login", login);
router.put("/update-profile", authenticateToken, updateProfile);
router.post("/verify-otp", verifyOTP);
router.get("/getalluser", getalluser);
router.get("/getuserbyid/:id", authenticateToken, getuserbyid);


module.exports = router;