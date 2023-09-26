const express = require("express");
const router = express.Router();

//Controlador con las acciones de las rutas
const rubroCobroController = require("../controllers/rubroCobroController");

//Rutas de rubros cobro

router.get("/", rubroCobroController.get);

router.post('/', rubroCobroController.create);

router.get("/:id", rubroCobroController.getById);

router.put('/:id', rubroCobroController.update);

module.exports = router;