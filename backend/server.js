require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const authMiddleware = require("./middlewares/authMiddleware"); // 🔥 Importar Middleware de Autenticación

const app = express();

// 🔥 Configuración de CORS para permitir solicitudes del frontend
const corsOptions = {
  origin: "*",  // Cambia "*" por la URL exacta de tu frontend si es necesario
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions)); // Aplica configuración CORS
app.use(express.json());
app.use(morgan("dev"));

// 📌 Rutas Públicas (sin autenticación)
app.use("/api/auth", require("./routes/auth.routes"));

// 📌 Rutas Protegidas (requieren autenticación)
app.use("/api/productos", require("./routes/productos.routes"));
app.use("/api/carrito", authMiddleware, require("./routes/carrito.routes"));  // 🔥 Protegida con authMiddleware
app.use("/api/usuarios", authMiddleware, require("./routes/usuarios.routes")); // 🔥 Protegida con authMiddleware

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🔥 Servidor corriendo en http://localhost:${PORT}`);
});
