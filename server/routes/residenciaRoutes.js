const express = require("express");
const router = express.Router();

//Controlador con las acciones de las rutas
const residenciaController = require("../controllers/residenciaController");

//Rutas de residencia

router.get("/", residenciaController.get);

router.get("/usuarios/:id", residenciaController.getByUser);

router.post("/", residenciaController.create);

router.get("/:id", residenciaController.getById);

router.put("/:id", residenciaController.update);

// TODO del update

module.exports = router;
