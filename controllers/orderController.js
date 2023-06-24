
const OrderModel = require('../models/Order');
const UserModel = require('../models/User');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
  });

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
        const createdOrder = await OrderModel.createCommande(orderData);
        const itemsData = {orderData};
        const createdItems = await OrderModel.createItems(itemsData);
        const delivery= await OrderModel.getDelivery(orderData.idPerson)
        

        // Replace `path/to/serviceAccountKey.json` with the actual path to your downloaded key file
        
        const user=await UserModel.getinfo(idClient);
        const deviceToken = user.token;
        console.log(deviceToken)
        const payload = {
          notification: {
            title: 'Preparing Order',
            body: 'Your order is validated, and it is being prepared ...',
          },
        };
        await admin.messaging().sendToDevice(deviceToken, payload);
          // Return a success response with the created order and items
          return res.status(200).json(delivery);
      } catch (error) {
        // Handle any errors
        return res.status(500).json({ error: error.message});
        // Return a success response with the created order and items
    } 
  },

  notif:async(req,res)=>{
    try{
      const { id, title, body} = req.body;
      const user=await UserModel.getinfo(id);
        const deviceToken = user.token;
        console.log(deviceToken)
        const payload = {
          notification: {
            title: title,
            body: body,
          },
        };
        await admin.messaging().sendToDevice(deviceToken, payload);
        res.status(200).json(res.message);
    }catch(error){
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};