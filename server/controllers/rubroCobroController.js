const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const rubros = await prisma.rubro_Cobro.findMany();
  response.json(rubros);
};

module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);

  const rubro = await prisma.rubro_Cobro.findUnique({
    where: { id: id },
  });

  response.json(rubro);
};

module.exports.create = async (request, response, next) => {
    let rubro = request.body;

    const newRubro = await prisma.rubro_Cobro.create({
      data: {
        descripcion: rubro.descripcion,
        monto: rubro.monto,
      },
    });
    response.json(newRubro);
  };

  module.exports.update = async (request, response, next) => {
    let rubro = request.body;
    let idRubro = parseInt(request.params.id);

    const rubroExist = await prisma.rubro_Cobro.findUnique({
      where: { id: idRubro }, 
    });
  
    const newRubro = await prisma.rubro_Cobro.update({
      where: { id: idRubro },
      data: {
        descripcion: rubro.descripcion,
        monto: rubro.monto,
      },
    });

    response.json(newRubro);
  }