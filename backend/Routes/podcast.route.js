const express = require('express');
const router = express.Router();
const { authenticateToken } = require("../Middlewares/auth.middleware");
const { createPodcast, getAllPodcasts } = require('../Controller/podcast.controller');

router.post("/generate",authenticateToken, createPodcast);
router.get("/",authenticateToken, getAllPodcasts);

module.exports = router;
