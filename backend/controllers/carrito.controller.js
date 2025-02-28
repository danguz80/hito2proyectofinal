const pool = require("../config/db");

// 📌 Obtener el carrito del usuario autenticado
const obtenerCarrito = async (req, res) => {
    try {
        const { id } = req.usuario; // ID del usuario autenticado
        const result = await pool.query(
            `SELECT c.id, c.cantidad, p.id AS producto_id, p.nombre, p.precio, p.imagen 
             FROM carritos c
             JOIN productos p ON c.producto_id = p.id
             WHERE c.usuario_id = $1`,
            [id]
        );
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
        res.status(500).json({ error: "Error al obtener el carrito" });
    }
};

// 📌 Agregar un producto al carrito
const agregarAlCarrito = async (req, res) => {
    try {
        const { id } = req.usuario;
        const { producto_id, cantidad } = req.body;

        const result = await pool.query(
            `INSERT INTO carritos (usuario_id, producto_id, cantidad) 
             VALUES ($1, $2, $3) 
             ON CONFLICT (usuario_id, producto_id) 
             DO UPDATE SET cantidad = carritos.cantidad + EXCLUDED.cantidad
             RETURNING *`,
            [id, producto_id, cantidad]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error al agregar al carrito:", error);
        res.status(500).json({ error: "Error al agregar producto al carrito" });
    }
};

// 📌 Actualizar la cantidad de un producto en el carrito
const actualizarCantidad = async (req, res) => {
    try {
        const { id } = req.usuario;
        const { id: producto_id } = req.params;
        const { cantidad } = req.body;

        await pool.query(
            "UPDATE carritos SET cantidad = $1 WHERE usuario_id = $2 AND producto_id = $3",
            [cantidad, id, producto_id]
        );

        res.json({ message: "Cantidad actualizada correctamente" });
    } catch (error) {
        console.error("Error al actualizar cantidad:", error);
        res.status(500).json({ error: "Error al actualizar cantidad" });
    }
};

const eliminarDelCarrito = async (req, res) => {
    try {
        const { id } = req.usuario;
        const { id: producto_id } = req.params;

        if (!producto_id || isNaN(Number(producto_id))) {
            return res.status(400).json({ error: "❌ ID de producto inválido" });
        }

        console.log(`🗑 Eliminando producto con ID: ${producto_id} del usuario ${id}`);

        const result = await pool.query(
            "DELETE FROM carritos WHERE usuario_id = $1 AND producto_id = $2 RETURNING *",
            [id, producto_id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "❌ Producto no encontrado en el carrito" });
        }

        res.json({ message: "✅ Producto eliminado del carrito" });
    } catch (error) {
        console.error("❌ Error al eliminar producto:", error);
        res.status(500).json({ error: "❌ Error al eliminar el producto" });
    }
};



// 📌 Vaciar el carrito
const vaciarCarrito = async (req, res) => {
    try {
        const { id } = req.usuario;

        await pool.query("DELETE FROM carritos WHERE usuario_id = $1", [id]);

        res.json({ message: "Carrito vaciado correctamente" });
    } catch (error) {
        console.error("Error al vaciar el carrito:", error);
        res.status(500).json({ error: "Error al vaciar el carrito" });
    }
};

// 📌 Finalizar la compra
const finalizarCompra = async (req, res) => {
    try {
        const { id } = req.usuario;

        // 🔥 Simulación: Guardar la compra en una tabla "pedidos"
        await pool.query(
            `INSERT INTO pedidos (usuario_id, total) 
             SELECT $1, SUM(p.precio * c.cantidad)
             FROM carritos c JOIN productos p ON c.producto_id = p.id 
             WHERE c.usuario_id = $1`,
            [id]
        );

        // 🔥 Vaciar el carrito después de la compra
        await pool.query("DELETE FROM carritos WHERE usuario_id = $1", [id]);

        res.json({ message: "Compra finalizada con éxito" });
    } catch (error) {
        console.error("Error al finalizar la compra:", error);
        res.status(500).json({ error: "Error al finalizar la compra" });
    }
};

module.exports = { obtenerCarrito, agregarAlCarrito, actualizarCantidad, eliminarDelCarrito, vaciarCarrito, finalizarCompra };
