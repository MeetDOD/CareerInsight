const express = require('express');
const router = express.Router();
const { addCourse,getCourses, getCourseById, getEnrolledCourses, enrollInCourse, updateProgress,getRecommendedCourses } = require('../Controller/usercourse.controller');
const { authenticateToken } = require("../Middlewares/auth.middleware")

router.post('/publishcourse', authenticateToken, addCourse);
router.get('/getallcourses', getCourses);
router.get('/getcourse/:id', getCourseById);
router.post('/enroll', authenticateToken, enrollInCourse);
router.get('/mycourses', authenticateToken, getEnrolledCourses);
router.put('/updateprogress', authenticateToken, updateProgress); 
router.get('/enrolled', authenticateToken, getEnrolledCourses);
router.get('/recommendations', authenticateToken, getRecommendedCourses);

module.exports = router;
