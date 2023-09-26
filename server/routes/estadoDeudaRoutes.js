const express = require("express");
const router = express.Router();

//Controlador con las acciones de las rutas
const estadoDeudaController = require("../controllers/estadoDeudaController");

//Rutas de incidencias

router.get("/", estadoDeudaController.get);

module.exports = router;