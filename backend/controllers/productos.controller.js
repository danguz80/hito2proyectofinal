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
        const { nombre, descripcion, precio, imagen, oferta = 0 } = req.body;

        if (!nombre || !descripcion || !precio || !imagen) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        const result = await pool.query(
            "INSERT INTO productos (nombre, descripcion, precio, imagen, oferta) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [nombre, descripcion, precio, imagen, oferta]
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
        const { nombre, descripcion, precio, imagen, oferta = 0 } = req.body;

        const producto = await pool.query("SELECT * FROM productos WHERE id = $1", [id]);
        if (producto.rowCount === 0) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        const result = await pool.query(
            "UPDATE productos SET nombre = $1, descripcion = $2, precio = $3, imagen = $4, oferta = $5 WHERE id = $6 RETURNING *",
            [nombre, descripcion, precio, imagen, oferta, id]
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

        const producto = await pool.query("SELECT * FROM productos WHERE id = $1", [id]);
        if (producto.rowCount === 0) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        await pool.query("DELETE FROM productos WHERE id = $1", [id]);
        res.json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        res.status(500).json({ error: "Error al eliminar producto" });
    }
};

// 📌 Actualizar oferta de un producto
const actualizarOferta = async (req, res) => {
    try {
        const { id } = req.params;
        const { oferta } = req.body;

        if (oferta < 0 || oferta > 100) {
            return res.status(400).json({ error: "El porcentaje de oferta debe estar entre 0 y 100" });
        }

        const producto = await pool.query("SELECT * FROM productos WHERE id = $1", [id]);
        if (producto.rowCount === 0) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        const result = await pool.query(
            "UPDATE productos SET oferta = $1 WHERE id = $2 RETURNING *",
            [oferta, id]
        );

        res.json({ message: "Oferta actualizada correctamente", producto: result.rows[0] });
    } catch (error) {
        console.error("Error al actualizar oferta:", error);
        res.status(500).json({ error: "Error al actualizar oferta" });
    }
};

// 📌 Obtener los 3 productos con mayor oferta
const obtenerProductosDestacados = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM productos WHERE oferta > 0 ORDER BY oferta DESC LIMIT 3"
        );

        const productos = result.rows.map(producto => ({
            ...producto,
            imagen: producto.imagen.startsWith("/") ? producto.imagen.slice(1) : producto.imagen,
        }));

        res.json(productos);
    } catch (error) {
        console.error("Error al obtener productos destacados:", error);
        res.status(500).json({ error: "Error al obtener productos destacados" });
    }
};

module.exports = { 
    obtenerProductos, 
    obtenerProductoPorId, 
    agregarProducto, 
    actualizarProducto, 
    eliminarProducto, 
    actualizarOferta,  // 🔥 Nueva función para actualizar ofertas
    obtenerProductosDestacados  // 🔥 Nueva función para obtener productos con mayores descuentos
};
