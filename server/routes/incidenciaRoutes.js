const express = require("express");
const router = express.Router();

//Controlador con las acciones de las rutas
const incidenciaController = require("../controllers/incidenciaController");

//Rutas de incidencias

router.get("/", incidenciaController.get);

router.get("/usuario/:id", incidenciaController.getByUser);

router.post('/', incidenciaController.create);

router.get("/:id", incidenciaController.getById);

router.put('/:id', incidenciaController.update);

// TODO del update
module.exports = router;