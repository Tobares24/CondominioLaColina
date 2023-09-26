const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const info = await prisma.informacion.findMany({
    include: {
      tipoInformacion: true,
      usuario: true,
    },
    orderBy: {
      id: "desc",
    },

  });
  response.json(info);
};

module.exports.create = async (request, response, next) => {
  let informacion = request.body;

  const newInformacion = await prisma.informacion.create({
    data: {
      foto: informacion.foto,
      descripcion: informacion.descripcion,
      asunto: informacion.asunto,
      fecha: informacion.fecha,
      tipoInformacion: {
        connect: {
          id: informacion.tipoInformacion
        },
      },
      usuario: {
        connect: { id: informacion.user.id },
      },
    },
  });

  response.json(newInformacion);
};

module.exports.update = async (request, response, next) => {
  let info = request.body;
  let idInfo = parseInt(request.params.id);

  const infoExist = await prisma.informacion.findUnique({
    where: { id: idInfo },
    include: {
      tipoInformacion: {
        select: { id: true }
      }
    }
  });

  const newInfo = await prisma.informacion.update({
    where: { id: idInfo },
    data: {
      foto: info.foto,
      descripcion: info.descripcion,
      asunto: info.asunto,
      fecha: info.fecha,
      tipoInformacion: {
        connect: { id: info.tipoInformacion }
      }
    }
  });
  response.json(newInfo);
};

module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);

  const info = await prisma.informacion.findUnique({
    where: { id: id },
    include: {
      tipoInformacion: true,
      usuario: true,
    },
  });

  response.json(info);
};
