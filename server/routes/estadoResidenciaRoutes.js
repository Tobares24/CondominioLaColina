const express = require("express");
const router = express.Router();

//Controlador con las acciones de las rutas
const estadoResidenciaController = require("../controllers/estadoResidenciaController");

//Rutas de incidencias

router.get("/", estadoResidenciaController.get);

module.exports = router;