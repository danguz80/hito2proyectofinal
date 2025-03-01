const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 📌 Registrar Usuario
const registrarUsuario = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 🔥 Verificar si el usuario ya existe
    const usuarioExistente = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
    if (usuarioExistente.rows.length > 0) {
      return res.status(400).json({ error: "El usuario ya está registrado" });
    }

    // 🔒 Hashear la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔥 Insertar nuevo usuario con rol `user` por defecto
    const nuevoUsuario = await pool.query(
      "INSERT INTO usuarios (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role",
      [name, email, hashedPassword, "user"]
    );

    // 📌 Generar token con `id`, `role`, `name` y `email`
    const token = jwt.sign(
      { id: nuevoUsuario.rows[0].id, role: "user", name, email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 🔥 Responder con el token y los datos del usuario
    res.status(201).json({ token, usuario: nuevoUsuario.rows[0] });

  } catch (error) {
    console.error("❌ Error en el registro:", error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

// 📌 Iniciar Sesión
const iniciarSesion = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔍 Buscar usuario por email
    const usuario = await pool.query("SELECT id, name, email, role, password FROM usuarios WHERE email = $1", [email]);

    // ❌ Si el usuario no existe
    if (usuario.rows.length === 0) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    // 🔒 Verificar la contraseña
    const esCorrecta = await bcrypt.compare(password, usuario.rows[0].password);
    if (!esCorrecta) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    // 📌 Generar token con toda la información necesaria
    const token = jwt.sign(
      {
        id: usuario.rows[0].id,
        name: usuario.rows[0].name,
        email: usuario.rows[0].email,
        role: usuario.rows[0].role || "user"
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // ✅ Responder con el token y los datos del usuario
    res.json({
      token,
      usuario: {
        id: usuario.rows[0].id,
        name: usuario.rows[0].name,
        email: usuario.rows[0].email,
        role: usuario.rows[0].role || "user"
      }
    });

  } catch (error) {
    console.error("❌ Error en el login:", error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

module.exports = { registrarUsuario, iniciarSesion };
