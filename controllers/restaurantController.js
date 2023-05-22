const { getAllRestaurants, getMenuById } = require('../models/Restaurant');


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
exports.getMenu = async (req, res) => {
    try {
        const menu = await getMenuById(req.params.id);
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
    const {idCommande, prixTotal, address, deliveryNotes, idClient, Concerne} = req.body;
    try{
        if (!idCommande || !prixTotal || !address || !idClient || !Concerne || !Array.isArray(Concerne)) {
            return res.status(400).json({ error: 'Invalid command data' });
        }
        const command = await prisma.command.create({
            data:{
                idCommande, 
                prixTotal, 
                address, 
                deliveryNotes, 
                idClient, 
                Concerne : {
                    create: Concerne.map((item)=>({
                        idMenu:id,
                        idCommande: idCommande,
                        size: size,
                        quantity: quantity,
                        notes: notes,
                    }))
                }
            }
        });
              
        res.json(command);
    } catch (error){
        console.error('Error storing command:', error);
        res.status(500).json({ error: 'Error storing command' });
    }
}
module.exports = exports;



