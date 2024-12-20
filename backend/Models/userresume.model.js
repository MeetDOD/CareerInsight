const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
    universityName: { 
        type: String, 
        required: true 
    },
    startDate: { 
        type: Date, 
        default: Date.now,
        required: true 
    },
    endDate: { 
        type: Date, 
        default: Date.now,
        required: true 
    },
    degree: { 
        type: String, 
        required: true 
    },
    major: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
});

const experienceSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    companyName: { 
        type: String, 
        required: true 
    },
    city: { 
        type: String, 
        required: true 
    },
    state: { 
        type: String, 
        required: true 
    },
    startDate: { 
        type: Date, 
        default: Date.now,
        required: true 
    },
    endDate: { 
        type: Date
    },
    currentlyWorking: { 
        type: Boolean, 
        default: false 
    },
    workSummary:{
        type:String,
        required: true
    }
});

const skillSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    rating: { 
        type: Number, 
        required: true 
    },
});

const resumeSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        firstName: { 
            type: String, 
            required: true 
        },
        lastName: { 
            type: String, 
            required: true 
        },
        jobTitle: { 
            type: String, 
            required: true 
        },
        address: { 
            type: String, 
            required: true 
        },
        phone: { 
            type: String, 
            required: true 
        },
        email: { 
            type: String, 
            required: true 
        },
        fontStyle: { 
            type: String, 
            default: 'Arial' 
        },
        themeColor: { 
            type: String, 
            default: '#7c3aed' 
        },
        summary: { 
            type: String 
        },
        education: [
            educationSchema
        ],
        experience: [
            experienceSchema
        ],
        skills: [
            skillSchema
        ],
    },
    { timestamps: true }
);

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = { Resume };