const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  createUser: async (userData) => {
    return await prisma.Client.create({
      data: {
        nomClient: userData.nom,
        prenomClient: userData.prenom,
        email: userData.email,
        mdp: userData.mdp,
        numTlf: userData.numTlf,
      },
    });
  },

  findUserByEmail: async (email) => {
    return await prisma.Client.findUnique({
      where: { email },
    });
  },
};
