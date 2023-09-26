const express = require("express");
const router = express.Router();

//Controlador con las acciones de las rutas
const informacionController = require("../controllers/informacionController");

//Rutas de informacion

router.get("/", informacionController.get);

router.post('/', informacionController.create);

router.put("/:id", informacionController.update);

router.get("/:id", informacionController.getById);

module.exports = router;
