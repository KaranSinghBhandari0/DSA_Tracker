const Question = require('../models/question');

const addQues = async (req, res) => {
    try {
        const { title, topic, link, notes } = req.body;

        if (!title || !topic) {
            return res.status(400).json({ message: "Title and topic are required" });
        }

        const formattedTitle = title
            .trim()
            .toLowerCase()
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

        const existingQues = await Question.findOne({ title: formattedTitle });
        if(existingQues) {
            return res.status(400).json({message: "Question already exist"});
        }

        const newQues = new Question({
            title: formattedTitle,
            topic: topic.trim(),
            link:  link.trim(),
            notes: notes.trim(),
            user: req.user._id,
        });

        await newQues.save();

        res.status(200).json({ message: "Question added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const questions = async (req,res) => {
    try {
        const questions = await Question.find({ user: req.user._id.toString() });

        res.status(200).json({ questions });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const editQues = async (req, res) => {
    try {
        const { id, title, link } = req.body;

        // Find the existing question
        const ques = await Question.findById(id);

        let formattedTitle = ques.title;
        if(title) {
            formattedTitle = title
                .trim()
                .toLowerCase()
                .split(" ")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");

            const existingQues = await Question.findOne({ title: formattedTitle });

            if (existingQues) {
                return res.status(400).json({ message: "Title already exists" });
            }
        }

        ques.title = formattedTitle;
        ques.link = link ? link.trim() : ques.link;

        await ques.save();

        res.status(200).json({ message: "Question edited successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const deleteQues = async (req,res) => {
    try {
        const { id } = req.params;
        const ques = await Question.findById(id);

        if(!ques) {
            return res.status(404).json({ message: 'Question not found' });
        }

        await Question.findByIdAndDelete(id);

        res.status(200).json({ message: 'Question Deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const editNotes = async (req,res) => {
    try {
        const { selectedQuestion, notes } = req.body;

        const question = await Question.findById(selectedQuestion._id);
        if(!question) {
            return res.status(404).json({message: "Question not found"});
        }

        question.notes = notes;
        await question.save();

        res.status(200).json({ message: 'Notes updated' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = { addQues, questions, editQues, deleteQues, editNotes };