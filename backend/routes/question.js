const express = require('express');
const router = express.Router();
const { addQues, editQues, deleteQues, editNotes, questions } = require('../controllers/question');
const {isAuthenticated} = require('../middlewares/auth');

router.post('/add', isAuthenticated, addQues);
router.get('/all', isAuthenticated, questions);
router.post('/edit', isAuthenticated, editQues);
router.delete('/:id', isAuthenticated, deleteQues);
router.post('/editNotes', isAuthenticated, editNotes);

module.exports = router;