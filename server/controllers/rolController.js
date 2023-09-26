const { PrismaClient } = require("@prisma/client");
const { response } = require("express");
const { request } = require("http");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
    const roles = await prisma.rol.findMany();
    response.json(roles);
};