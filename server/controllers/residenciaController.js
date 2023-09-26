const { PrismaClient } = require("@prisma/client");
const { response } = require("express");
const { request } = require("http");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const residencias = await prisma.residencia.findMany({
    orderBy: {
      numResidencia: 'desc'
    },
    include: {
      usuario: true,
      estado: true,
      deuda: true,
    },
  });
  response.json(residencias);
};

module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);

  const residencia = await prisma.residencia.findUnique({
    where: { numResidencia: id },
    include: {
      estado: true,
      usuario: true,
      deuda: {
        include: {
          estadoDeuda: true,
        },
      },
    },
  });

  response.json(residencia);
};

module.exports.getByUser = async (request, response, next) => {
  let id = parseInt(request.params.id);

  const residencia = await prisma.residencia.findMany({
    where: {
      usuario: {
        id: id,
      }
    },
    include: {
      estado: true,
      usuario: true,
      deuda: {
        include: {
          estadoDeuda: true,
        },
      },
    },
  });

  response.json(residencia);
};

module.exports.create = async (request, response, next) => {
  let residencia = request.body;

  const newResidencia = await prisma.residencia.create({
    data: {
      foto: residencia.foto,
      cantPersonas: residencia.cantPersonas,
      cantCarros: residencia.cantCarros,
      cantHabitaciones: residencia.cantHabitaciones,
      cantBannios: residencia.cantBannios,
      annioInicio: residencia.annioInicio,
      precio: residencia.precio,
      usuario: {
        connect: {
          id: residencia.usuario
        }
      },
      estado: {
        connect: {
          id: residencia.estado
        }
      },
      deuda: {
        connect: {
          id: residencia.deuda
        }
      }
    }
  });
  response.json(newResidencia);
}

module.exports.update = async (request, response, next) => {
  let residencia = request.body;
  let idResidencia = parseInt(request.params.id);

  const newResidencia = await prisma.residencia.update({
    where: { numResidencia: idResidencia },
    data: {
      foto: residencia.foto,
      cantPersonas: parseInt(residencia.cantPersonas),
      cantCarros: parseInt(residencia.cantCarros),
      cantHabitaciones: parseInt(residencia.cantHabitaciones),
      cantBannios: parseInt(residencia.cantBannios),
      annioInicio: residencia.annioInicio,
      precio: parseFloat(residencia.precio),
      usuario: {
        connect: {
          id: residencia.usuario
        }
      },
      estado: {
        connect: {
          id: residencia.estado
        }
      },
      deuda: {
        connect: {
          id: residencia.deuda
        }
      }
    }
  });
  response.json(newResidencia);
}