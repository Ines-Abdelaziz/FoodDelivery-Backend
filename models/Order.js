const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports={
    createOrder : async (orderData) => {
        const { idClient, prixTotal, address, deliveryNotes, Concerne } = orderData;
        return await prisma.Commande.create({
            data: {
                prixTotal,
                address,
                deliveryNotes,
                idClient,  
                Concerne:{
                    create:Concerne.map((item) => ({
                      idMenu: item.idMenu,
                      size: item.size,
                      quantity: item.quantity,
                      notes: item.notes
                    }))
                }       
            },
            include: {
              Concerne: true, // Include the created items in the response
            },
          });

    }
};