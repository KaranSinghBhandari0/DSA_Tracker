const express = require('express');
const router = express.Router();
const { signup, login, logout, isAuth } = require('../controllers/auth');
const {isAuthenticated} = require('../middlewares/auth');

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/isAuth", isAuthenticated, isAuth);

module.exports = router;