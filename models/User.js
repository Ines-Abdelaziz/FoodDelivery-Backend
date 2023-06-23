const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports = {
  createUser: async (userData) => {
    return await prisma.Client.create({
      data: {
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
  getinfo:async(userId)=>{
    return await prisma.Client.findFirst({where:
      {idClient:{
        equals:parseInt(userId)
      } },
    })
  }
};
