const express = require('express');
const router = express.Router();
const { addCourse,getCourses, getCourseById } = require('../Controller/usercourse.controller');
const { authenticateToken } = require("../Middlewares/auth.middleware")

router.post('/publishcourse', authenticateToken, addCourse);
router.get('/getallcourses', getCourses);
router.get('/getcourse/:id', getCourseById);

module.exports = router;
