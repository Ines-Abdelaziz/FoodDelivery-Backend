const express = require('express');
const router = express.Router();
const authController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;