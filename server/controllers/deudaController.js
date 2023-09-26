const { PrismaClient } = require("@prisma/client");
const { response } = require("express");
const { request } = require("http");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const deudas = await await prisma.deuda.findMany({
    include: {
      estadoDeuda: true,
      planCobro: true,
      residencia: true,
    },
  });
  response.json(deudas);
};

module.exports.create = async (request, response, next) => {
  let deuda = request.body;
  console.log(deuda);
  const newDeuda = await prisma.deuda.create({
    data: {
      monto: deuda.monto,
      fecha: deuda.fecha,
      estadoDeuda: {
        connect: {
          id: deuda.estado
        }
      },
      planCobro: {
        connect: {
          id: deuda.planCobro
        }
      }
    }
  });
  response.json(newDeuda);
}

module.exports.addDeuda = async (request, response, next) => {
  let deuda = request.body;

  console.log('data', deuda);

  const newDeuda = await prisma.deuda.create({
    data: {
      monto: deuda.monto,
      fecha: deuda.fecha,
      estadoDeuda: {
        connect: {
          id: deuda.estado
        }
      },
      planCobro: {
        connect: {
          id: deuda.planCobro
        }
      },
      residencia: {
        connect: {
          numResidencia: 9
        }
      }
    }
  });
  response.json(newDeuda);
}

module.exports.update = async (request, response, next) => {
  let deuda = request.body;
  let id = request.params.id;
  const newDeuda = await prisma.deuda.update({
    where: { id: id },
    data: {
      monto: deuda.monto,
      fecha: deuda.fecha,
      estadoDeuda: {
        connect: {
          id: deuda.estado
        }
      },
      planCobro: {
        connect: {
          id: deuda.planCobro
        }
      }
    }
  });
  response.json(newDeuda);
}

module.exports.updateEstado = async (request, response, next) => {
  console.log('No entra');
  let id = parseInt(request.body.id);
  let idEstado = parseInt(request.body.idEstado);

  const deuda = await prisma.deuda.update({
    where: { id: id },
    data: {
      estadoDeuda: {
        connect: {
          id: 2
        }
      }
    }
  });
  response.json(deuda);
};

module.exports.getByUser = async (request, response, next) => {
  let userId = parseInt(request.params.id);
  console.log(userId);
  const deuda = await prisma.deuda.findMany({
    where: {
      residencia: {
        some: {
          usuario: {
            id: userId
          }
        }
      }
    },
    include: {
      estadoDeuda: true,
      planCobro: true,
      residencia: true
    }
  });
  response.json(deuda);
};

module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);

  const deuda = await prisma.deuda.findUnique({
    where: { id: id },
    include: {
      estadoDeuda: true,
      planCobro: true,
      residencia: true,
    },
  });

  response.json(deuda);
};
