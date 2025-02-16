import { createContext, useState, useEffect } from "react";

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const obtenerCarritoInicial = () => {
    try {
      const carritoGuardado = localStorage.getItem("carrito");
      return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    } catch (error) {
      console.error("Error al cargar el carrito desde localStorage:", error);
      return [];
    }
  };

  const [carrito, setCarrito] = useState(obtenerCarritoInicial);
  const [mensaje, setMensaje] = useState(""); // Estado para el mensaje de éxito

  useEffect(() => {
    try {
      localStorage.setItem("carrito", JSON.stringify(carrito));
    } catch (error) {
      console.error("Error al guardar el carrito en localStorage:", error);
    }
  }, [carrito]);

  // Función para agregar un producto al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => [...prevCarrito, producto]);
    setMensaje("Producto agregado exitosamente ✅"); // Mostrar mensaje de éxito
    setTimeout(() => setMensaje(""), 2000); // Ocultar mensaje después de 2 segundos
  };

  // Función para eliminar un producto específico del carrito
  const eliminarDelCarrito = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter((producto) => producto.id !== id));
  };

  // Función para vaciar completamente el carrito
  const vaciarCarrito = () => {
    setCarrito([]); // Limpia el estado
    localStorage.removeItem("carrito"); // Borra del localStorage
  };

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito, mensaje }}>
      {children}
    </CarritoContext.Provider>
  );
};
