require('dotenv').config();
const mongoose = require("mongoose");
const Question = require("./models/question");

const questions = [
];

mongoose
    .connect(process.env.DB_URL)
    .then(async () => {
        console.log("Connected to MongoDB");
        await Question.insertMany(questions);
        console.log("Sample questions added!");
    })
    .catch((err) => console.error("MongoDB Connection Error:", err))
    .finally(async () => {
        await mongoose.disconnect();
        console.log("MongoDB connection closed.");
    });