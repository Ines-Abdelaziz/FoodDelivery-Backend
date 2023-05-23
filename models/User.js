const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  createUser: async (userData) => {
    return await prisma.Client.create({
      data: {
        nomClient: userData.nomClient,
        prenomClient: userData.prenomClient,
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
