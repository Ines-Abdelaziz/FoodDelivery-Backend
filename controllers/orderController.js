const OrderModel = require('../models/Order');
module.exports = {
    validate: async (req, res) => {
      try {
        const { idClient, prixTotal, address, deliveryNotes, Concerne } = req.body;
        if(!idClient || !prixTotal || !address || !Concerne){
          return res.status(400).json({ error: 'Incomplete command data' });
        }
        if (typeof idClient !== 'number' || typeof prixTotal !== 'number' || !Array.isArray(Concerne)) {
          return res.status(400).json({ error: 'Invalid command data' });
        }
        if (prixTotal <= 0) {
          return res.status(400).json({ error: 'Invalid total price' });
        }
        const orderData=req.body;
        const createdOrder = await OrderModel.createOrder(orderData);
          // Return a success response with the created order and items
          return res.status(200).json({ message: 'Order created successfully', order: createdOrder });
      } catch (error) {
        // Handle any errors
        return res.status(500).json({ error: error.message });
      }
    },
};