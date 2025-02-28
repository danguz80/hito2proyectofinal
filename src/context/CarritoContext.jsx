import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { obtenerCarrito, agregarAlCarrito, actualizarCantidad, eliminarDelCarrito, vaciarCarrito } from "../services/api";

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [carrito, setCarrito] = useState([]);
  const [mensaje, setMensaje] = useState("");

  // 📌 Función para obtener el carrito desde el backend
  const fetchCarrito = async () => {
    if (!user) return;

    try {
      console.log("🛍️ Obteniendo carrito desde el backend...");
      const data = await obtenerCarrito();
      setCarrito(data);
      console.log("✅ Carrito actualizado:", data);
    } catch (error) {
      console.error("❌ Error al obtener carrito:", error);
    }
  };

  // 📌 Cargar el carrito cuando el usuario cambia
  useEffect(() => {
    fetchCarrito();
  }, [user]);

  // 📌 Agregar un producto al carrito
  const agregarProducto = async (producto, cantidad = 1) => {
    if (!user) {
      setMensaje("❌ Debes iniciar sesión para agregar productos al carrito");
      setTimeout(() => setMensaje(""), 3000);
      return;
    }

    try {
      console.log(`🛒 Agregando producto ${producto.id} con cantidad ${cantidad}`);
      await agregarAlCarrito({ producto_id: producto.id, cantidad });
      await fetchCarrito(); // 🔥 Volver a obtener el carrito después de agregar
      setMensaje("✅ Producto agregado al carrito");
      setTimeout(() => setMensaje(""), 3000);
    } catch (error) {
      console.error("❌ Error al agregar al carrito:", error);
    }
  };

  // 📌 Actualizar la cantidad de un producto en el carrito
  const actualizarCantidadProducto = async (producto_id, cantidad) => {
    if (!user) return;

    try {
      console.log(`🔄 Actualizando cantidad del producto ${producto_id} a ${cantidad}`);
      await actualizarCantidad(producto_id, cantidad);
      await fetchCarrito(); // 🔥 Refrescar carrito después de actualizar cantidad
    } catch (error) {
      console.error("❌ Error al actualizar cantidad:", error);
    }
  };

  // 📌 Eliminar un producto del carrito
  const eliminarProducto = async (producto_id) => {
    if (!user) return;

    try {
      console.log(`🛑 Intentando eliminar producto con ID: ${producto_id}`);
      await eliminarDelCarrito(producto_id);
      await fetchCarrito(); // 🔥 Volver a obtener el carrito después de eliminar
      setMensaje("✅ Producto eliminado");
      setTimeout(() => setMensaje(""), 3000);
    } catch (error) {
      console.error("❌ Error al eliminar producto:", error);
    }
  };

  // 📌 Vaciar el carrito
  const vaciarCarritoCompleto = async () => {
    if (!user) return;

    try {
      console.log("🗑️ Vaciando carrito...");
      await vaciarCarrito();
      await fetchCarrito(); // 🔥 Asegurar que el carrito se vacía correctamente
      setMensaje("✅ Carrito vaciado");
      setTimeout(() => setMensaje(""), 3000);
    } catch (error) {
      console.error("❌ Error al vaciar carrito:", error);
    }
  };
    // 📌 🔥 Función para calcular la cantidad total de productos en el carrito
    const obtenerCantidadTotal = () => {
      return carrito.reduce((total, producto) => total + (producto.cantidad || 1), 0);
    };

    return (
      <CarritoContext.Provider 
        value={{ 
          carrito, 
          agregarProducto, 
          actualizarCantidadProducto, 
          eliminarProducto, 
          vaciarCarritoCompleto, 
          obtenerCantidadTotal, // 🔥 Asegurar que esté disponible 
          mensaje 
        }}
      >
        {children}
      </CarritoContext.Provider>
    );
    
};
