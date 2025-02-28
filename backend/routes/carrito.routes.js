const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { 
    obtenerCarrito, 
    agregarAlCarrito, 
    actualizarCantidad, 
    eliminarDelCarrito, 
    vaciarCarrito, 
    finalizarCompra 
} = require("../controllers/carrito.controller");

const router = express.Router();

// 📌 Obtener el carrito del usuario autenticado
router.get("/", authMiddleware, obtenerCarrito);

// 📌 Agregar un producto al carrito
router.post("/", authMiddleware, agregarAlCarrito);

// 📌 Actualizar la cantidad de un producto en el carrito
router.put("/:id", authMiddleware, actualizarCantidad);

// 📌 Eliminar un producto del carrito
router.delete("/:id", authMiddleware, eliminarDelCarrito);

// 📌 Vaciar el carrito
router.delete("/", authMiddleware, vaciarCarrito);

// 📌 Finalizar la compra
router.post("/finalizar", authMiddleware, finalizarCompra);

module.exports = router;
