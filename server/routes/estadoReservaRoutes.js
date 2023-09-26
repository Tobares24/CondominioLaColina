const express = require("express");
const router = express.Router();

//Controlador con las acciones de las rutas
const estadoReservaController = require("../controllers/estadoIncidenciaController");

//Rutas de incidencias

router.get("/", estadoReservaController.get);

module.exports = router;