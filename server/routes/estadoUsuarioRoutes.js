const express = require("express");
const router = express.Router();

//Controlador con las acciones de las rutas
const estadoUsuarioController = require("../controllers/estadoUsuarioController");

//Rutas de incidencias

router.get("/", estadoUsuarioController.get);

module.exports = router;