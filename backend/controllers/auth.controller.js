const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Registrar Usuario
const registrarUsuario = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const usuarioExistente = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);

    if (usuarioExistente.rows.length > 0) {
      return res.status(400).json({ error: "El usuario ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = await pool.query(
      "INSERT INTO usuarios (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, role",
      [name, email, hashedPassword]
    );

    const token = jwt.sign({ id: nuevoUsuario.rows[0].id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ token, usuario: nuevoUsuario.rows[0] });
  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

// Iniciar Sesión
const iniciarSesion = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await pool.query("SELECT id, name, email, role, password FROM usuarios WHERE email = $1", [email]);

    if (usuario.rows.length === 0) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const esCorrecta = await bcrypt.compare(password, usuario.rows[0].password);
    if (!esCorrecta) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const token = jwt.sign({ id: usuario.rows[0].id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({
      token,
      usuario: {
        id: usuario.rows[0].id,
        name: usuario.rows[0].name, // 🔥 Ahora enviamos `name`
        email: usuario.rows[0].email,
        role: usuario.rows[0].role || "user"
      }
    });

  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

module.exports = { registrarUsuario, iniciarSesion };
