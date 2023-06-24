const { getAllRestaurants, getMenu, getDetails} = require('../models/Restaurant');
const RestaurantModel = require('../models/Restaurant');

// Get all restaurants
exports.getAllRestaurants = async (req, res) => {
    try {
        
        const restaurants = await getAllRestaurants();
        const restaurantList = restaurants.map((restaurant) => {
            const typeNames = restaurant.appartient.map((item) => item.type.LibelleType);
            delete restaurant.appartient;
            const type=typeNames.join(',');
            return {
              ...restaurant,
              type,
            };
          });
        res.json(restaurantList);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}
// Get menus by ID restaurant
exports.getMenu = async (req, res) => {
    try {
        const menu = await getMenu(req.params.id);
        if (!menu) {
            return res.status(404).json({ message: 'Menus not found' });
        }
        res.json(menu);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}
exports.getCommands = async (req, res) => {
    try {
        const menu = await getCommands(req.params.id);
        if (!menu) {
            return res.status(404).json({ message: 'commands not found' });
        }
        res.json(menu);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}
exports.getDetails = async (req, res) => {
    try {
        const menu = await getDetails(req.params.id);
        if (!menu) {
            return res.status(404).json({ message: 'Menus not found' });
        }
        res.json(menu);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}
exports.addRating = async (req, res) => {
    const { idRestaurant,rating, comment } = req.body;
    try {
        if (!rating || !comment) {
            return res.status(400).json({ error: 'Invalid rating data' });
        }
    RatingData=req.body;
    RatingData.idRestaurant=parseInt(idRestaurant);
    const createdRating = await RestaurantModel.addRating(RatingData);
    const ratings = await RestaurantModel.getRestaurantRatings(idRestaurant);
     const ratingsSum = ratings.reduce((acc, rating) => acc + rating.note, 0);
     const generalRating = ratingsSum / ratings.length;
     await RestaurantModel.updateRating(req.params.id, generalRating);
    res.status(200).json({ message: 'Rating made successfully', rating: createdRating });
    } catch (error) {
        console.error('Error storing rating:', error);
        res.status(500).json({ error: 'Error storing rating' });
    }

    

}
exports.getRatings = async (req, res) => {
    try {
        const ratings = await RestaurantModel.getRestaurantRatings(req.params.id);
        if (!ratings) {
            return res.status(404).json({ message: 'Ratings not found' });
        }
        res.status(200).json(ratings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

module.exports = exports;


