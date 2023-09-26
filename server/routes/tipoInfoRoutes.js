const express = require("express");
const router = express.Router();

//Controlador con las acciones de las rutas
const tipoInfoController = require("../controllers/tipoInfoController");


router.get("/", tipoInfoController.get);
router.get("/:id", tipoInfoController.getById);


module.exports = router;
