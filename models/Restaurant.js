const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Retrieve all restaurants
const getAllRestaurants = async () => {
    return await prisma.restaurant.findMany();
    }

// Retrieve restaurant by ID
const getRestaurantById = async (id) => {
    return await prisma.restaurant.findUnique({
        where: { id: parseInt(id) },
    });
    }

module.exports = { getAllRestaurants, getRestaurantById };