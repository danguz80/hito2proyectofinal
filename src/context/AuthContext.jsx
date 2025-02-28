import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      const parsedUser = JSON.parse(storedUser);
      console.log("Usuario cargado desde localStorage:", parsedUser); // 👀 Verificar si `role` se guarda bien
      setUser(parsedUser);
      setIsAdmin(parsedUser.role && parsedUser.role === "admin");
    }
  }, []);

  const login = (userData, token) => {
    console.log("Usuario autenticado:", userData); // 👀 Verificar que `role` llega al frontend
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);
    setIsAdmin(userData.role === "admin");
  };
  

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
