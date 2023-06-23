const express = require('express');
const router = express.Router();
const RestaurantController = require('../controllers/restaurantController');

// Get all restaurants
router.get('/', RestaurantController.getAllRestaurants);

// Get a restaurant by ID
router.get('/:id', RestaurantController.getMenu);
router.post('/:id/ratings', RestaurantController.addRating);
//get menu by id
router.get('/menu/:id',RestaurantController.getDetails);
router.get('/:id/ratings', RestaurantController.getRatings);
module.exports = router;
