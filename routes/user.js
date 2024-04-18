const express = require('express');
const router = express();
const authController = require('../controllers/auth.js');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;
