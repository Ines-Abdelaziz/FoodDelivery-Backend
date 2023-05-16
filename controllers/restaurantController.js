const { getAllRestaurants, getRestaurantById } = require('../models/Restaurant');


// Get all restaurants
exports.getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await getAllRestaurants();
        res.json(restaurants);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

// Get a restaurant by ID
exports.getRestaurant = async (req, res) => {
    try {
        const restaurant = await getRestaurantById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.json(restaurant);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

// Export the controller function
module.exports = exports;



