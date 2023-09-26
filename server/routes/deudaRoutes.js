const express = require("express");
const router = express.Router();

//Controlador con las acciones de las rutas
const deudaController = require("../controllers/deudaController");

//Rutas de deudas

router.get("/", deudaController.get);

router.get("/usuarios/:id", deudaController.getByUser);

router.post("/", deudaController.create);

router.post("/nueva", deudaController.addDeuda);

router.get("/:id", deudaController.getById);

router.put("/:id", deudaController.update);

router.put("/estado/:id", deudaController.updateEstado);

// TODO del update

module.exports = router;
