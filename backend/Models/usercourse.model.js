const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
    subtitle: String,
    content: String,
});

const ChapterSchema = new mongoose.Schema({
    title: String,
    explanation: String,
    sections: [SectionSchema],
    videoId: String,
    duration: String,
});

const CourseSchema = new mongoose.Schema({
    thumbnail:String,
    courseName: { type: String, required: true },
    category: String,
    courseLevel: String,
    duration: String,
    language: String,
    topic: String,
    description: String,
    chapters: [ChapterSchema],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
},{timestamps:true});

module.exports = mongoose.model('Course', CourseSchema);
