const express = require('express');
const router = express.Router();
const RestaurantController = require('../controllers/restaurantController');

// Get all restaurants
router.get('/', RestaurantController.getAllRestaurants);

// Get a restaurant by ID
router.get('/:id/menu', RestaurantController.getMenu);

//Validate Commands
router.post('/command', RestaurantController.validateCommand);

module.exports = router;
