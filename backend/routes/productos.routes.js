const express = require("express");
const { 
  obtenerProductos, 
  agregarProducto, 
  obtenerProductoPorId, 
  actualizarProducto, 
  eliminarProducto,
  actualizarOferta,  // 🔥 Nueva función en el controlador
  obtenerProductosDestacados // 🔥 Nueva función en el controlador
} = require("../controllers/productos.controller");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// 📌 Middleware para verificar si el usuario es administrador
const verificarAdmin = (req, res, next) => {
    if (!req.usuario || req.usuario.role !== "admin") {
        return res.status(403).json({ error: "No tienes permisos para realizar esta acción" });
    }
    next();
};

// 📌 Obtener todos los productos
router.get("/", obtenerProductos);

// 📌 Obtener los 3 productos con mayor oferta
router.get("/destacados", obtenerProductosDestacados);

// 📌 Obtener un producto por ID
router.get("/:id", obtenerProductoPorId);

// 📌 Agregar producto (Solo administradores)
router.post("/", authMiddleware, verificarAdmin, agregarProducto);

// 📌 Actualizar producto (Solo administradores)
router.put("/:id", authMiddleware, verificarAdmin, actualizarProducto);

// 📌 Actualizar la oferta de un producto (Solo administradores)
router.put("/:id/oferta", authMiddleware, verificarAdmin, actualizarOferta);  // 🔥 Nueva ruta

// 📌 Eliminar producto (Solo administradores)
router.delete("/:id", authMiddleware, verificarAdmin, eliminarProducto);

module.exports = router;
