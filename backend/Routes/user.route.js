const express = require('express');
const router = express.Router();
const { register, login, updateProfile, verifyOTP, getalluser, getuserbyid, adduserdetail } = require("../Controller/user.controller");
const { authenticateToken } = require("../Middlewares/auth.middleware")

router.post("/register", register);
router.post("/login", login);
router.put("/update-profile", authenticateToken, updateProfile);
router.post("/verify-otp", verifyOTP);
router.get("/getalluser", getalluser);
router.get("/me", authenticateToken, getuserbyid);
router.post("/adduserdetail", authenticateToken, adduserdetail);

module.exports = router;