const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const plan = await prisma.plan_Cobro.findMany({
    include: {
      rubroCobro: true,
    }
  });
  response.json(plan);
};

module.exports.create = async (request, response, next) => {
  let planCobro = request.body;
  const newPlanCobro = await prisma.plan_Cobro.create({
    data: {
      descripcion: planCobro.descripcion,
      rubroCobro: {
        connect: planCobro.rubroCobro,
      }
    }
  });
  response.json(newPlanCobro);
}

module.exports.update = async (request, response, next) => {
  let planCobro = request.body;
  let idPlanCobro = parseInt(request.params.id);

  const planCobroExist = await prisma.plan_Cobro.findUnique({
    where: { id: idPlanCobro },
    include: {
      rubroCobro: {
        select: { id: true }
      }
    }
  });

  const newPlanCobro = await prisma.plan_Cobro.update({
    where: { id: idPlanCobro },
    data: {
      descripcion: planCobro.descripcion,
      rubroCobro: {
        disconnect: planCobroExist.rubroCobro,
        connect: planCobro.rubroCobro,
      }
    }
  });
  response.json(newPlanCobro);
}

module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);

  const plan = await prisma.plan_Cobro.findUnique({
    where: { id: id },
    include: {
      rubroCobro: true,
      deuda: true,
    },
  });
  response.json(plan);
};
