const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const reservas = await prisma.reserva.findMany(
    {
      include: {
        areaComun: true,
        estado: true,
        usuario: true,
        horario: true,
      },
    }
  );
  response.json(reservas);
};

module.exports.create = async (request, response, next) => {
  let reserva = request.body;
  const newReserva = await prisma.reserva.create({
    data: {
      areaComun: {
        connect: {
          id: reserva.idAreaComun
        },
      },
      estado: {
        connect: {
          id: reserva.idEstado,
        },
      },
      usuario: {
        connect: {
          id: reserva.idUsuario,
        },
      },
      horario: {
        connect: reserva.horario,
      }
    }
  });
  response.json(newReserva);
}

module.exports.update = async (request, response, next) => {
  const reservaId = parseInt(request.body.id);
  const estadoId = parseInt(request.body.idEstado);

  try {
    const reserva = await prisma.reserva.update({
      where: { id: reservaId },
      data: {
        estado: {
          connect: {
            id: estadoId
          }
        }
      }
    });
    response.json(reserva);
  } catch (error) {
    next(error);
  }
};



module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);

  const reserva = await prisma.reserva.findUnique({
    where: { id: id },
    include: {
      areaComun: {
        include: {
          horario: true,
        }
      },
      estado: true,
      usuario: true,
    },
  });

  response.json(reserva);
};

module.exports.getUsuarioById = async (request, response, next) => {
  let userId = parseInt(request.params.id);

  const reservas = await prisma.reserva.findMany({
    where: {
      usuario: {
        id: userId
      }
    },
    include: {
      areaComun: {
        include: {
          horario: true
        }
      },
      estado: true,
      usuario: true,
      horario: true
    }
  });

  response.json(reservas);
};