import { createContext, useState, useEffect, useContext } from "react";
import { CarritoContext } from "./CarritoContext";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const carritoContext = useContext(CarritoContext);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      const parsedUser = JSON.parse(storedUser);
      console.log("🔄 Usuario cargado desde localStorage:", parsedUser);
      setUser(parsedUser);
      setIsAdmin(parsedUser.role === "admin");

      // 🔥 Solo llamar a `fetchCarrito` si `CarritoContext` está disponible
      if (carritoContext?.fetchCarrito) {
        carritoContext.fetchCarrito();
      }
    }
  }, []);

  // 📌 Función de inicio de sesión
  const login = (userData, token) => {
    console.log("✅ Usuario autenticado:", userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);
    setIsAdmin(userData.role === "admin");

    if (carritoContext?.fetchCarrito) {
      carritoContext.fetchCarrito();
    }
  };

  // 📌 Función de cierre de sesión
  const logout = () => {
    console.log("🔴 Cerrando sesión...");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setIsAdmin(false);

    if (carritoContext?.setCarrito) {
      carritoContext.setCarrito([]); // 🔥 Vaciar el carrito solo si `CarritoContext` está disponible
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
