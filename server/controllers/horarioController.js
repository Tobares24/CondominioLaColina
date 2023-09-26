const { PrismaClient } = require("@prisma/client");
const { response } = require("express");
const { request } = require("http");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
    const horarios = await prisma.horario.findMany();
    response.json(horarios);
};

module.exports.create = async (request, response, next) => {
    let horario = request.body;
    const newPlanCobro = await prisma.horario.create({
        data: {
            descripcion: horario.descripcion,
        }
    });
    response.json(newPlanCobro);
}

module.exports.getById = async (request, response, next) => {
    let id = parseInt(request.params.id);

    const horario = await prisma.area_Comun.findUnique({
        where: { id: id }
    });

    response.json(horario);
};