const mongoose = require("mongoose");
require("dotenv").config();

const db = process.env.MONGO_URL;

mongoose
    .connect(db)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Failed to connect to MongoDB", err);
    });