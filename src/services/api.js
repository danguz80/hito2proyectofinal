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


// 📌 Productos
export const getProductos = async () => {
  try {
    const response = await axios.get(`${API_URL}/productos`);
    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener productos:", error);
    return [];
  }
};

export const createProducto = async (producto) => {
  try {
    const response = await axios.post(`${API_URL}/productos`, producto, {
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error al crear producto:", error);
    throw new Error("Error al crear producto");
  }
};

export const updateProducto = async (id, updatedData) => {
  try {
    await axios.put(`${API_URL}/productos/${id}`, updatedData, {
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    });
    console.log(`✅ Producto ${id} actualizado correctamente`);
  } catch (error) {
    console.error("❌ Error al actualizar producto:", error);
    throw new Error("Error al actualizar producto");
  }
};

export const deleteProducto = async (id) => {
  try {
    await axios.delete(`${API_URL}/productos/${id}`, { headers: getAuthHeaders() });
    console.log(`✅ Producto ${id} eliminado correctamente`);
  } catch (error) {
    console.error("❌ Error al eliminar producto:", error);
    throw new Error("Error al eliminar producto");
  }
};

// 📌 Usuarios (Solo Admin)
export const getUsuarios = async () => {
  try {
    const response = await axios.get(`${API_URL}/usuarios`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener usuarios:", error);
    throw error;
  }
};

export const updateUsuario = async (id, userData) => {
  try {
    const response = await axios.put(`${API_URL}/usuarios/${id}`, userData, {
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error al actualizar usuario:", error);
    throw error;
  }
};

export const deleteUsuario = async (id) => {
  try {
    await axios.delete(`${API_URL}/usuarios/${id}`, { headers: getAuthHeaders() });
  } catch (error) {
    console.error("❌ Error al eliminar usuario:", error);
    throw error;
  }
};

// 📌 Carrito
export const obtenerCarrito = async () => {
  const headers = getAuthHeaders(); 
  if (!headers.Authorization) {
    console.error("❌ Error: No hay token en la solicitud");
    throw new Error("No hay token de autenticación disponible");
  }
  
  try {
    const response = await axios.get(`${API_URL}/carrito`, { headers });
    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener carrito:", error.response?.data || error.message);
    throw error;
  }
};


export const agregarAlCarrito = async ({ producto_id, cantidad }) => {
  try {
    const response = await axios.post(`${API_URL}/carrito`, { producto_id, cantidad }, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("❌ Error al agregar producto al carrito:", error);
    throw new Error("No se pudo agregar el producto al carrito.");
  }
};

export const actualizarCantidad = async (producto_id, cantidad) => {
  try {
    await axios.put(`${API_URL}/carrito/${producto_id}`, { cantidad }, { headers: getAuthHeaders() });
  } catch (error) {
    console.error("❌ Error al actualizar cantidad:", error);
    throw error;
  }
};

export const eliminarDelCarrito = async (producto_id) => {
  try {
    await axios.delete(`${API_URL}/carrito/${producto_id}`, { headers: getAuthHeaders() });
  } catch (error) {
    console.error("❌ Error al eliminar producto:", error);
    throw error;
  }
};

export const vaciarCarrito = async () => {
  try {
    await axios.delete(`${API_URL}/carrito`, { headers: getAuthHeaders() });
  } catch (error) {
    console.error("❌ Error al vaciar carrito:", error);
    throw error;
  }
};

// 📌 Finalizar compra (Solo Usuarios Autenticados)
export const finalizarCompra = async () => {
  try {
    const response = await axios.post(`${API_URL}/carrito/finalizar`, {}, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("❌ Error al finalizar la compra:", error);
    throw error;
  }
};

// 📌 Autenticación
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data;
  } catch (error) {
    console.error("❌ Error al iniciar sesión:", error);
    throw new Error("Error en el inicio de sesión");
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error("❌ Error al registrar usuario:", error);
    throw new Error("Error en el registro");
  }
};
export { getAuthHeaders };
