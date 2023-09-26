const { PrismaClient } = require('@prisma/client');
const { response } = require('express');
const { request } = require('http');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const { use } = require('../routes/usuarioRoutes');

const prisma = new PrismaClient();

module.exports.register = async (request, response, next) => {
    const userData = request.body;
    console.log(userData);
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(userData.clave, salt);

    const user = await prisma.usuario.create({
        data: {
            nombre: userData.nombre,
            primerApellido: userData.primerApellido,
            segundoApellido: userData.segundoApellido,
            email: userData.email,
            clave: hash,
            rol: {
                connect: { id: userData.rol }
            },
            estado: {
                connect: { id: userData.estado }
            }
        }
    });
    console.log(user);
    response.status(200).json({
        status: true,
        message: 'Usuario creado',
        data: user
    });
};

module.exports.login = async (request, response, next) => {
    let userReq = request.body;


    const user = await prisma.usuario.findUnique({
        where: {
            email: userReq.email,
        },
    });

    if (!user) {
        response.status(401).send({
            succes: false,
            message: 'Usuario no registrado',
        });
        return;
    }
    if (user.idEstado != 1) {
        response.status(401).send({
            succes: false,
            message: 'El usuario no está activo',
        });
        return;
    }

    const checkPassword = await bcrypt.compare(userReq.clave, user.clave);
    if (checkPassword == false) {
        response.status(401).send({
            succes: false,
            message: 'Credenciales no válidas'
        });
    } else {
        const payload = {
            email: user.email,
            rol: user.rol,
        };

        const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE,
        });
        response.json({
            succes: true,
            message: 'Usuario Registrado',
            data: {
                user,
                token
            }
        });
    }
};

module.exports.get = async (request, response, next) => {
    const usuarios = await prisma.usuario.findMany({
        include: {
            estado: true,
            rol: true,
        }
    });
    response.json(usuarios);
};

module.exports.getByEmail = async (request, response, next) => {
    try {
        let email = request.params.email;
        console.log(request.body);
        const usuario = await prisma.usuario.findUnique({
            where: {
                email: email,
            },
        });

        response.json(usuario);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Error al buscar usuario por email' });
    }

};


module.exports.getById = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const usuario = await prisma.usuario.findUnique({
        where: { id: id },
        include: {
            rol: true,
        }
    });

    response.json(usuario);
};

module.exports.update = async (request, response, next) => {
    console.log('No entra');
    let id = parseInt(request.body.id);
    let idEstado = parseInt(request.body.idEstado);

    const usuario = await prisma.usuario.update({
        where: { id: id },
        data: {
            estado: {
                connect: { id: idEstado }
            }
        }
    });
    response.json(usuario);
};