const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    password: {
        type: String,
        min: 8,
        required: true
    },
    otp: {
        type: Number
    },
    dateofbirth: {
        type: Date,
    },
    gender: {
        type: String,
    },
    photo: {
        type: String
    },
    phoneno: {
        type: Number

    },
    userType: {
        type: String,
        default: "student"
    },

},
    { timestamps: true });

const User = mongoose.model("user", userSchema);

module.exports = { User };
