const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

//Validate a command
router.post('/validate', orderController.validate);

module.exports = router;

