const express = require('express');
const router = express.Router();
const { authenticateToken } = require("../Middlewares/auth.middleware")
const { createorder ,checkStatus} = require("../Controller/payment.controller");


router.post("/pay",authenticateToken, createorder);
router.get("/verify/:orderId", checkStatus);

module.exports = router;
