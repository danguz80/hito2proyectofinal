import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./context/AuthContext"; // 🔥 Ahora primero
import { CarritoProvider } from "./context/CarritoContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider> {/* 🔥 AuthProvider primero */}
      <CarritoProvider>
        <AppRouter />
      </CarritoProvider>
    </AuthProvider>
  </React.StrictMode>
);
