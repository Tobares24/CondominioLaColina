const { PrismaClient } = require("@prisma/client");
const { response } = require("express");
const { request } = require("http");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const areas = await prisma.area_Comun.findMany({
    include: {
      horario: true,
    },
  });
  response.json(areas);
};

module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);

  const area = await prisma.area_Comun.findUnique({
    where: { id: id },
    include: {
      horario: true,
      reserva: true,
    },
  });

  response.json(area);
};

module.exports.update = async (request, response, next) => { };

