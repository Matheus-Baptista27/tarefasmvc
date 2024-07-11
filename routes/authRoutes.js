// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/tasks',
    failureRedirect: '/login',
}));

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await User.create({ username, password: hashedPassword });
        res.redirect('/login');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
