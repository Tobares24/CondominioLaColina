const express = require("express");
const router = express.Router();

//Controlador con las acciones de las rutas
const estadoIncidenciaController = require("../controllers/estadoIncidenciaController");

//Rutas de incidencias

router.get("/", estadoIncidenciaController.get);

module.exports = router;