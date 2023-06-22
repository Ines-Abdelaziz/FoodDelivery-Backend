const { getAllRestaurants, getMenu, getDetails} = require('../models/Restaurant');

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
exports.validateCommand = async (req, res) => {

    const {prixTotal, address, deliveryNotes, idClient, orders} = req.body;
    try{
        if (!prixTotal || !address || !idClient || !orders || !Array.isArray(orders)) {
            return res.status(400).json({ error: 'Invalid command data' });
        }
        if(prixTotal<0){
            return res.status(400).json({ error: 'Invalid command data' });
        }
        
        const command = await prisma.command.create({
                  // Store the command in the database
            data: {
                idCommande,
                prixTotal,
                address,
                deliveryNotes,
                idClient,
                Concerne: {
                    create: Concerne.map((product) => ({
                        idMenu: product.idMenu,
                        idCommande: idCommande,
                        size: product.size,
                        quantity: product.quantity,
                        notes: product.notes,
                       
                    })),
                },
            },
        });
      
        res.json(command);
    } catch (error){
        console.error('Error storing command:', error);
        res.status(500).json({ error: 'Error storing command' });
    }
}
module.exports = exports;


