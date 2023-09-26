const express = require("express");
const router = express.Router();

//Controlador con las acciones de las rutas
const horarioController = require("../controllers/horarioController");

//Rutas de rubros cobro

router.get("/", horarioController.get);

router.get("/:id", horarioController.getById);

module.exports = router;