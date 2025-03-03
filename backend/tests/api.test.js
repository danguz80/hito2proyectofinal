const request = require("supertest");
const app = require("../server"); // 🔥 Importa la instancia de la app en lugar de crear un servidor nuevo

// 🔹 Prueba 1: Obtener lista de productos (GET)
test("✅ Debería obtener una lista de productos", async () => {
  const response = await request(app).get("/api/productos");
  expect(response.statusCode).toBe(200);
  expect(response.body).toBeInstanceOf(Array);
});

// 🔹 Prueba 2: Registrar un usuario (POST)
test("✅ Debería registrar un nuevo usuario", async () => {
  const timestamp = Date.now(); // Generar un timestamp único
  const newUser = { name: "Prueba", email: `test${timestamp}@example.com`, password: "123456" };

  const response = await request(app).post("/api/auth/register").send(newUser);

  console.log("🔍 Respuesta del servidor:", response.body); 

  expect(response.statusCode).toBe(201);
  expect(response.body).toHaveProperty("token");
});



// 🔹 Prueba 3: Login con credenciales incorrectas (POST)
test("❌ No debería permitir iniciar sesión con credenciales incorrectas", async () => {
  const response = await request(app).post("/api/auth/login").send({ email: "test@example.com", password: "incorrecto" });

  expect(response.statusCode).toBe(401);
  expect(response.body).toHaveProperty("error");
});

// 🔹 Prueba 4: Obtener carrito con usuario autenticado (GET)
test("✅ Debería obtener el carrito si el usuario está autenticado", async () => {
  const loginResponse = await request(app).post("/api/auth/login").send({ email: "danguz80@outlook.com", password: "20062006" });

  expect(loginResponse.statusCode).toBe(200);
  const token = loginResponse.body.token;

  const response = await request(app)
    .get("/api/carrito")
    .set("Authorization", `Bearer ${token}`);

  expect(response.statusCode).toBe(200);
});
