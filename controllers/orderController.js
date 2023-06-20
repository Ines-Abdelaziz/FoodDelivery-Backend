const OrderModel = require('../models/Order');
module.exports = {
    validate: async (req, res) => {
      try {
        const { idClient, idPerson, prixTotal, address, deliveryNotes, Items, idCommande } = req.body;
        if(!idClient || !prixTotal || !address || !Items){
          return res.status(400).json({ error: 'Incomplete command data' });
        }
        if (typeof idClient !== 'number' || typeof prixTotal !== 'number' || !Array.isArray(Items)) {
          return res.status(400).json({ error: 'Invalid command data' });
        }
        if (prixTotal <= 0) {
          return res.status(400).json({ error: 'Invalid total price' });
        }
        const orderData=req.body;
        const createdCommande = await OrderModel.createCommande(orderData);
        const itemsData = {orderData};
        const createdItems = await OrderModel.createItems(itemsData);
          // Return a success response with the created order and items
          return res.status(200).json({ message: 'Order created successfully', order: createdOrder });
      } catch (error) {
        // Handle any errors
        return res.status(500).json({ error: error.message});
      }
    },
};