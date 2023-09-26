const express = require("express");
const router = express.Router();

//Controlador con las acciones de las rutas
const rolController = require("../controllers/rolController");

//Rutas de incidencias

router.get("/", rolController.get);

module.exports = router;