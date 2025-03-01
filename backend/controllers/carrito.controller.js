const pool = require("../config/db");

// 📌 Obtener el carrito del usuario autenticado
const obtenerCarrito = async (req, res) => {
    try {
        if (!req.usuario || !req.usuario.id) {
            console.error("⚠ Usuario no autenticado al intentar obtener el carrito.");
            return res.status(401).json({ error: "Usuario no autenticado" });
        }

        console.log(`🔍 Buscando carrito para el usuario ID: ${req.usuario.id}`);

        const result = await pool.query(
            `SELECT c.id, c.cantidad, p.id AS producto_id, p.nombre, p.precio, p.imagen 
             FROM carritos c
             JOIN productos p ON c.producto_id = p.id
             WHERE c.usuario_id = $1`,
            [req.usuario.id]
        );

        console.log("📦 Resultado de la consulta:", result.rows);

        res.json(result.rows);
    } catch (error) {
        console.error("❌ Error al obtener el carrito:", error);
        res.status(500).json({ error: "Error al obtener el carrito" });
    }
};


// 📌 Agregar un producto al carrito
const agregarAlCarrito = async (req, res) => {
    try {
        if (!req.usuario || !req.usuario.id) {
            console.error("⚠ Usuario no autenticado al intentar agregar al carrito.");
            return res.status(401).json({ error: "Usuario no autenticado" });
        }

        const { id } = req.usuario;
        const { producto_id, cantidad } = req.body;

        if (!producto_id || cantidad <= 0) {
            return res.status(400).json({ error: "❌ Producto inválido o cantidad no válida" });
        }

        console.log(`🛒 Agregando producto ${producto_id} al carrito del usuario ${id}`);

        const result = await pool.query(
            `INSERT INTO carritos (usuario_id, producto_id, cantidad) 
             VALUES ($1, $2, $3) 
             ON CONFLICT (usuario_id, producto_id) 
             DO UPDATE SET cantidad = carritos.cantidad + EXCLUDED.cantidad
             RETURNING *`,
            [id, producto_id, cantidad]
        );

        console.log("✅ Producto agregado al carrito:", result.rows[0]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error("❌ Error al agregar al carrito:", error);
        res.status(500).json({ error: "Error al agregar producto al carrito" });
    }
};

// 📌 Actualizar la cantidad de un producto en el carrito
const actualizarCantidad = async (req, res) => {
    try {
        if (!req.usuario || !req.usuario.id) {
            console.error("⚠ Usuario no autenticado al intentar actualizar cantidad.");
            return res.status(401).json({ error: "Usuario no autenticado" });
        }

        const { id } = req.usuario;
        const { id: producto_id } = req.params;
        const { cantidad } = req.body;

        if (cantidad <= 0) {
            return res.status(400).json({ error: "❌ La cantidad debe ser mayor a 0" });
        }

        console.log(`🔄 Actualizando cantidad del producto ${producto_id} en el carrito de usuario ${id}`);

        await pool.query(
            "UPDATE carritos SET cantidad = $1 WHERE usuario_id = $2 AND producto_id = $3",
            [cantidad, id, producto_id]
        );

        console.log("✅ Cantidad actualizada correctamente");
        res.json({ message: "Cantidad actualizada correctamente" });
    } catch (error) {
        console.error("❌ Error al actualizar cantidad:", error);
        res.status(500).json({ error: "Error al actualizar cantidad" });
    }
};

// 📌 Eliminar un producto del carrito
const eliminarDelCarrito = async (req, res) => {
    try {
        if (!req.usuario || !req.usuario.id) {
            console.error("⚠ Usuario no autenticado al intentar eliminar del carrito.");
            return res.status(401).json({ error: "Usuario no autenticado" });
        }

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

        console.log("✅ Producto eliminado del carrito");
        res.json({ message: "✅ Producto eliminado del carrito" });
    } catch (error) {
        console.error("❌ Error al eliminar producto:", error);
        res.status(500).json({ error: "Error al eliminar el producto" });
    }
};

// 📌 Vaciar el carrito
const vaciarCarrito = async (req, res) => {
    try {
        if (!req.usuario || !req.usuario.id) {
            console.error("⚠ Usuario no autenticado al intentar vaciar el carrito.");
            return res.status(401).json({ error: "Usuario no autenticado" });
        }

        const { id } = req.usuario;

        console.log(`🗑 Vaciando carrito del usuario ID: ${id}`);

        await pool.query("DELETE FROM carritos WHERE usuario_id = $1", [id]);

        console.log("✅ Carrito vaciado correctamente");
        res.json({ message: "Carrito vaciado correctamente" });
    } catch (error) {
        console.error("❌ Error al vaciar el carrito:", error);
        res.status(500).json({ error: "Error al vaciar el carrito" });
    }
};

// 📌 Finalizar la compra
const finalizarCompra = async (req, res) => {
    try {
        if (!req.usuario || !req.usuario.id) {
            console.error("⚠ Usuario no autenticado al intentar finalizar la compra.");
            return res.status(401).json({ error: "Usuario no autenticado" });
        }

        const { id } = req.usuario;

        console.log(`🛍 Finalizando compra para usuario ID: ${id}`);

        // 🔥 Simulación: Guardar la compra en una tabla "pedidos"
        const pedidoResult = await pool.query(
            `INSERT INTO pedidos (usuario_id, total) 
             SELECT $1, COALESCE(SUM(p.precio * c.cantidad), 0)
             FROM carritos c JOIN productos p ON c.producto_id = p.id 
             WHERE c.usuario_id = $1
             RETURNING id`,
            [id]
        );

        if (pedidoResult.rowCount === 0) {
            return res.status(400).json({ error: "No hay productos en el carrito" });
        }

        console.log(`🛍 Pedido registrado con ID: ${pedidoResult.rows[0].id}`);

        // 🔥 Vaciar el carrito después de la compra
        await pool.query("DELETE FROM carritos WHERE usuario_id = $1", [id]);

        console.log("✅ Compra finalizada y carrito vaciado");
        res.json({ message: "Compra finalizada con éxito" });
    } catch (error) {
        console.error("❌ Error al finalizar la compra:", error);
        res.status(500).json({ error: "Error al finalizar la compra" });
    }
};

module.exports = { 
    obtenerCarrito, 
    agregarAlCarrito, 
    actualizarCantidad, 
    eliminarDelCarrito, 
    vaciarCarrito, 
    finalizarCompra 
};
