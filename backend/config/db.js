const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: "backend_user",
  host: "localhost",
  database: "tienda_total",
  password: "backend123",  // Asegúrate de que sea la correcta
  port: 5432,
});

module.exports = pool;
