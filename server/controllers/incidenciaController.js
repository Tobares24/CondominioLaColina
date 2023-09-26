const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const incidencias = await prisma.incidencia.findMany({
    include: {
      estado: true,
      usuario: true,
    },
    orderBy: {
      idEstado: 'asc'
    }
  });
  response.json(incidencias);
};

module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);

  const incidencia = await prisma.incidencia.findUnique({
    where: { id: id },
    include: {
      estado: true,
      usuario: true,
    },
  });

  response.json(incidencia);
};

module.exports.getByUser = async (request, response, next) => {
  let userId = parseInt(request.params.id);

  const incidencia = await prisma.incidencia.findMany({
    where: {
      usuario: {
        id: userId
      }
    },
    include: {
      estado: true,
    },
  });

  response.json(incidencia);
};

module.exports.create = async (request, response, next) => {
  let incidencia = request.body;

  const newIncidencia = await prisma.incidencia.create({
    data: {
      descripcion: incidencia.descripcion,
      estado: {
        connect: { id: incidencia.estado },
      },
      usuario: {
        connect: { id: Number(incidencia.user) },
      },
    },
  });

  response.json(newIncidencia);
};

module.exports.update = async (request, response, next) => {
  console.log('No entra');
  let id = parseInt(request.body.id);
  let idEstado = parseInt(request.body.idEstado);

  const incidencia = await prisma.incidencia.update({
    where: { id: id },
    data: {
      estado: {
        connect: { id: idEstado }
      }
    }
  });
  response.json(incidencia);
};