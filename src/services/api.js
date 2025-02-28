import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL.replace(/\/$/, "");

// 📌 Obtener token de autenticación
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("❌ No hay token disponible en localStorage");
    return {};
  }
  return { Authorization: `Bearer ${token}` };
};

// 📌 Crear producto (Requiere autenticación)
export const createProducto = async (producto) => {
  try {
    const response = await axios.post(`${API_URL}/productos`, producto, {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error al crear producto:", error);
    throw new Error("Error al crear producto");
  }
};

// 📌 Obtener lista de productos
export const getProductos = async () => {
  try {
    const response = await axios.get(`${API_URL}/productos`);
    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener productos:", error);
    return [];
  }
};

// 📌 Obtener carrito del usuario autenticado
export const obtenerCarrito = async () => {
  try {
    const response = await axios.get(`${API_URL}/carrito`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener carrito:", error);
    throw error;
  }
};

// 📌 Agregar producto al carrito
export const agregarAlCarrito = async ({ producto_id, cantidad }) => {
  if (!producto_id || cantidad <= 0) {
    console.error("❌ Error: producto_id o cantidad inválidos", { producto_id, cantidad });
    throw new Error("No se pudo agregar el producto al carrito.");
  }

  try {
    console.log(`🛒 Agregando producto ${producto_id} con cantidad ${cantidad}`);
    const response = await axios.post(`${API_URL}/carrito`, { producto_id, cantidad }, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("❌ Error al agregar producto al carrito:", error.response?.data || error.message);
    throw new Error("No se pudo agregar el producto al carrito.");
  }
};

// 📌 Actualizar cantidad en el carrito
export const actualizarCantidad = async (producto_id, cantidad) => {
  try {
    await axios.put(`${API_URL}/carrito/${producto_id}`, { cantidad }, { headers: getAuthHeaders() });
  } catch (error) {
    console.error("❌ Error al actualizar cantidad:", error);
    throw error;
  }
};

// 📌 Eliminar producto del carrito
export const eliminarDelCarrito = async (producto_id) => {
  try {
    if (!producto_id) {
      console.error("❌ Error: producto_id no válido");
      throw new Error("producto_id no válido");
    }
    console.log(`🛑 Eliminando producto con ID: ${producto_id}`);
    await axios.delete(`${API_URL}/carrito/${producto_id}`, { headers: getAuthHeaders() });
    console.log(`✅ Producto ${producto_id} eliminado del carrito`);
  } catch (error) {
    console.error("❌ Error al eliminar producto:", error);
    throw error;
  }
};

// 📌 Vaciar carrito
export const vaciarCarrito = async () => {
  try {
    await axios.delete(`${API_URL}/carrito`, { headers: getAuthHeaders() });
  } catch (error) {
    console.error("❌ Error al vaciar carrito:", error);
    throw error;
  }
};

// 📌 Eliminar un producto de la base de datos (Requiere autenticación)
export const deleteProducto = async (id) => {
  try {
    if (!id) {
      console.error("❌ Error: ID de producto inválido en deleteProducto:", id);
      throw new Error("ID de producto no válido");
    }

    console.log(`🛑 Enviando solicitud para eliminar producto con ID: ${id}`);

    await axios.delete(`${API_URL}/productos/${id}`, {
      headers: getAuthHeaders(),
    });

    console.log(`✅ Producto ${id} eliminado correctamente`);
  } catch (error) {
    console.error("❌ Error al eliminar producto:", error.response?.data || error.message);
    throw new Error("Error al eliminar producto");
  }
};

// 📌 Finalizar compra
export const finalizarCompra = async () => {
  try {
    const response = await axios.post(`${API_URL}/carrito/finalizar`, {}, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("❌ Error al finalizar la compra:", error);
    throw error;
  }
};

// 📌 Iniciar sesión
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data; // Devuelve { token, usuario }
  } catch (error) {
    console.error("❌ Error al iniciar sesión:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Error en el inicio de sesión");
  }
};

// 📌 Registrar usuario
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error("❌ Error al registrar usuario:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Error en el registro");
  }
};

// 📌 Actualizar producto (Requiere autenticación)
export const updateProducto = async (id, updatedData) => {
  try {
    if (!id || !updatedData) {
      console.error("❌ Error: ID o datos inválidos en updateProducto");
      throw new Error("ID o datos inválidos");
    }

    console.log(`🛠️ Actualizando producto con ID: ${id}`);

    await axios.put(`${API_URL}/productos/${id}`, updatedData, {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
    });

    console.log(`✅ Producto ${id} actualizado correctamente`);
  } catch (error) {
    console.error("❌ Error al actualizar producto:", error.response?.data || error.message);
    throw new Error("Error al actualizar producto");
  }
};
