const express = require("express");
const { registrarUsuario, iniciarSesion } = require("../controllers/auth.controller");

const router = express.Router();

// 📌 Ruta para registrar usuario
router.post("/register", async (req, res, next) => {
  try {
    await registrarUsuario(req, res);
  } catch (error) {
    next(error);
  }
});

// 📌 Ruta para iniciar sesión
router.post("/login", async (req, res, next) => {
  try {
    await iniciarSesion(req, res);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
