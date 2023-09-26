const express = require("express");
const router = express.Router();

//Controlador con las acciones de las rutas
const areaComunController = require("../controllers/areaComunController");

//Rutas de Area Comun

router.get("/", areaComunController.get);

router.get("/:id", areaComunController.getById);

module.exports=router;
