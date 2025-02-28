import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./routes/AppRouter";
import { CarritoProvider } from "./context/CarritoContext";
import { AuthProvider } from "./context/AuthContext"; // Importamos el AuthProvider
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider> {/* Aseguramos que el contexto de autenticación esté disponible */}
      <CarritoProvider>
        <AppRouter />
      </CarritoProvider>
    </AuthProvider>
  </React.StrictMode>
);
