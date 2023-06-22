const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Retrieve all restaurants
const getAllRestaurants = async () => {
    return await prisma.restaurant.findMany({
        include: {
          appartient: {
            include: {
              type: true,
            },
          },
        },
      });
    }

// Retrieve Menu by ID restaurant
const getMenu = async (id) => {
    return await prisma.menu.findMany({
        where: { idRestaurant: parseInt(id) },
    });     
    }
const getCommands= async (id) => {
    return await prisma.Commande.findMany();     
    }

// Retrieve restaurant by ID
const getDetails = async (id) => {
    return await prisma.menu.findUnique({
        where: { idMenu: parseInt(id) },
    });
    }
const restaurantWithTypes = async (id) => {
    return await prisma.restaurant.findUnique({
        where: { idRestaurant: id },
        include: {
            appartient: {
            include: {
                type: true,
            },
            },
        },
    })
}
      
    
async function createCommand(id, totalPrice, products) {
try {
    // Store the command in the database
    const command = await prisma.command.create({
    data: {
        id,
        totalPrice,
        products: {
        create: products.map((product) => ({
            name: product.name,
            price: product.price,
        })),
        },
    },
    });

    return command;
} catch (error) {
    console.error('Error storing command:', error);
    throw new Error('Error storing command');
}
}

module.exports = { getAllRestaurants, getMenu, getDetails };