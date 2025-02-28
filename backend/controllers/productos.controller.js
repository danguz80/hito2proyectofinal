const pool = require("../config/db");

// 📌 Obtener todos los productos
const obtenerProductos = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM productos");

        // 🔥 Aseguramos que las rutas de imagen sean correctas (eliminamos `/` inicial)
        const productos = result.rows.map(producto => ({
            ...producto,
            imagen: producto.imagen.startsWith("/") ? producto.imagen.slice(1) : producto.imagen,
        }));

        res.json(productos);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ error: "Error al obtener productos" });
    }
};

// 📌 Obtener un producto por su ID
const obtenerProductoPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query("SELECT * FROM productos WHERE id = $1", [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error al obtener producto por ID:", error);
        res.status(500).json({ error: "Error al obtener el producto" });
    }
};

// 📌 Agregar un producto
const agregarProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio, imagen } = req.body;
        
        if (!nombre || !descripcion || !precio || !imagen) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        const result = await pool.query(
            "INSERT INTO productos (nombre, descripcion, precio, imagen) VALUES ($1, $2, $3, $4) RETURNING *",
            [nombre, descripcion, precio, imagen]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error al agregar producto:", error);
        res.status(500).json({ error: "Error al agregar producto" });
    }
};

// 📌 Actualizar un producto por ID
const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio, imagen } = req.body;

        // Verificar si el producto existe antes de actualizar
        const producto = await pool.query("SELECT * FROM productos WHERE id = $1", [id]);

        if (producto.rowCount === 0) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        // Actualizar el producto
        const result = await pool.query(
            "UPDATE productos SET nombre = $1, descripcion = $2, precio = $3, imagen = $4 WHERE id = $5 RETURNING *",
            [nombre, descripcion, precio, imagen, id]
        );

        res.json({ message: "Producto actualizado correctamente", producto: result.rows[0] });
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        res.status(500).json({ error: "Error al actualizar producto" });
    }
};

// 📌 Eliminar un producto por ID
const eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar si el producto existe antes de eliminarlo
        const producto = await pool.query("SELECT * FROM productos WHERE id = $1", [id]);

        if (producto.rowCount === 0) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        // Eliminar el producto
        await pool.query("DELETE FROM productos WHERE id = $1", [id]);

        res.json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        res.status(500).json({ error: "Error al eliminar producto" });
    }
};

module.exports = { obtenerProductos, obtenerProductoPorId, agregarProducto, actualizarProducto, eliminarProducto };
