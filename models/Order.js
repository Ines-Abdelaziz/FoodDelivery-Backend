const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports={
    createCommande : async (orderData) => {
        return await prisma.Commande.create({
          data: {
            idCommande:orderData.idCommande,
            prixTotal:orderData.prixTotal,
            address:orderData.address,
            deliveryNotes:orderData.deliveryNotes,
            idPerson:orderData.idPerson,
            idClient:orderData.idClient,
          },
        });

    },

    createItems: async(data) => {
      const{ Items, idCommande}=data.orderData;
      return await Promise.all(
        Items.map((item) =>
          prisma.Items.create({
            data: {
              idMenu: item.idMenu,
              idCommande: idCommande,
              size: item.size,
              quantity: item.quantity,
              notes: item.notes,
            },
          })
        )
      );
    }
};