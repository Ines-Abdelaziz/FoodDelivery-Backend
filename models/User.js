const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports = {
  createUser: async (userData) => {
    return await prisma.Client.create({
      data: {
        idClient :userData.idClient,
        NomClient: userData.NomClient,
        PrenomClient: userData.PrenomClient,
        email: userData.email,
        mdp: userData.mdp,
        numTlf: userData.numTlf,
      },
    });
  },

  findUserByEmail: async (mail) => {
    return await prisma.Client.findFirst({
      where: {email:{
        equals:mail
      } },
    });
  },
};
