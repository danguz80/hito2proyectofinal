const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER || "tienda_total_user",
  host: process.env.DB_HOST || "dpg-cv3p8q5umphs73el1p70-a.oregon-postgres.render.com",
  database: process.env.DB_NAME || "tienda_total",
  password: process.env.DB_PASSWORD || "vyrCP7fBmiRDIqRL6rVsOg4Kk8M565eT",
  port: process.env.DB_PORT || 5432,
  ssl: {
    rejectUnauthorized: false, // 🚀 Necesario para Render
  },
});

pool.connect()
  .then(() => console.log("✅ Conectado a la base de datos en Render"))
  .catch(err => console.error("❌ Error de conexión a la base de datos:", err));

module.exports = pool;
