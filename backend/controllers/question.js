const Question = require('../models/question');

const addQues = async (req,res) => {
    try {
        const {title, topic, link, notes} = req.body;

        const existingQues = await Question.findOne({ 
            $or: [
                { title: title.trim() }, 
                { link: link.trim() }
            ]
        });
        if(existingQues) {
            return res.status(400).json({message: "Question already exist"});
        }

        const newQues = new Question({
            title: title.trim(),
            topic: topic.trim(),
            link: link.trim(),
            notes: notes.trim(),
            user: req.user._id,
        })
        await newQues.save();

        res.status(200).json({ message: 'Question added' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const questions = async (req,res) => {
    try {
        const questions = await Question.find({ user: req.user._id.toString() });

        res.status(200).json({ questions });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const editQues = async (req,res) => {
    try {
        const { id, title, link } = req.body;
        const ques = await Question.findById(id);

        if(!ques) {
            return res.status(404).json({ message: 'Question not found' });
        }

        ques.title = title || ques.title;
        ques.link = link || ques.link;

        await ques.save();

        res.status(200).json({ message: 'Question Editted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

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