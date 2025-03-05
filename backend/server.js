require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const authMiddleware = require("./middlewares/authMiddleware"); // 🔥 Middleware de Autenticación

const app = express();

// 🔥 Configuración de CORS para permitir solicitudes solo desde el frontend
const corsOptions = {
  origin: [
    "https://earnest-puffpuff-9eeb40.netlify.app", // ✅ URL del frontend en Netlify
    "http://localhost:5173" // ✅ Mantenerlo para desarrollo local
  ],
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Servidor en ejecución correctamente 🚀");
});


// 📌 Servir archivos estáticos desde la carpeta `public`
const path = require("path");
app.use("/public", express.static(path.join(__dirname, "../public")));

// 📌 Rutas Públicas (sin autenticación)
app.use("/api/auth", require("./routes/auth.routes"));

// 📌 Rutas Protegidas (requieren autenticación)
app.use("/api/productos", require("./routes/productos.routes"));
app.use("/api/carrito", authMiddleware, require("./routes/carrito.routes"));
app.use("/api/usuarios", authMiddleware, require("./routes/usuarios.routes"));

// 🔥 Iniciar el servidor solo si no estamos ejecutando pruebas
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🔥 Servidor corriendo en http://localhost:${PORT}`);
  });
}

module.exports = app;
