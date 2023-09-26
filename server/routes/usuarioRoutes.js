const express = require("express");
const router = express.Router();

//Controlador con las acciones de las rutas
const usuarioController = require("../controllers/usuarioController");

//Rutas de usuarios

router.get("/", usuarioController.get);

router.post("/login", usuarioController.login);

router.post("/registrar", usuarioController.register);

router.get("/:id", usuarioController.getById);

router.get("/get/:email", usuarioController.getByEmail);

router.put("/:id", usuarioController.update);


module.exports = router;
