const mongoose = require('mongoose');

// Question schema
const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"]
    },
    topic: {
        type: String,
        required: [true, "topic is required"]
    },
    link: {
        type: String,
    },
    notes: {
        type: String,
    },
    user: {
        type: String,
        required: [true, "user is required"]
    },
    important: {
        type: Boolean,
        default: false,
    }
});

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;