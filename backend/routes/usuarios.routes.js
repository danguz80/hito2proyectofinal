const express = require("express");
const pool = require("../config/db");

const router = express.Router();

// ✅ Obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name AS nombre, email, role AS rol FROM usuarios");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

// ✅ Actualizar un usuario (nombre, email, rol)
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, email, rol } = req.body;

  try {
    const result = await pool.query(
      "UPDATE usuarios SET name = $1, email = $2, role = $3 WHERE id = $4 RETURNING *",
      [nombre, email, rol, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario actualizado correctamente", usuario: result.rows[0] });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
});

// ✅ Eliminar un usuario por ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM usuarios WHERE id = $1 RETURNING *", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario eliminado correctamente", usuario: result.rows[0] });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
});

module.exports = router;
