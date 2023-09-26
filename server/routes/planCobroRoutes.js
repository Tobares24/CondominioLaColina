const express = require("express");
const router = express.Router();

//Controlador con las acciones de las rutas
const planCobroController = require("../controllers/planCobroController");

//Rutas de planes de cobro
router.get("/", planCobroController.get);

router.post('/', planCobroController.create);

router.get("/:id", planCobroController.getById);

router.put('/:id', planCobroController.update);

module.exports = router;
