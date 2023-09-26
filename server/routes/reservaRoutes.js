const express = require("express");
const router = express.Router();

//Controlador con las acciones de las rutas
const reservaController = require("../controllers/reservaController");

//Rutas de reserva

router.get("/", reservaController.get);

router.post("/", reservaController.create);

router.get("/:id", reservaController.getById);

router.get('/usuarios/:id', reservaController.getUsuarioById);


router.put('/:id', reservaController.update);


module.exports = router;
