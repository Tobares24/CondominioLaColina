const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
    const tipoInfo = await prisma.tipo_Informacion.findMany();
    response.json(tipoInfo);
};

module.exports.getById = async (request, response, next) => {
    let id = parseInt(request.params.id);

    const tipoInfo = await prisma.tipo_Informacion.findUnique({
        where: { id: id },
 
    });

    response.json(tipoInfo);
};