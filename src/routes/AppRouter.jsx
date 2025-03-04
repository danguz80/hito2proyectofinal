import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Productos from "../pages/Productos";
import ProductoDetalle from "../pages/ProductoDetalle";
import Carrito from "../pages/Carrito";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import CreatePost from "../pages/CreatePost"; // 🔥 Importamos CreatePost.jsx
import NotFound from "../pages/NotFound";
import "../index.css";

const AppRouter = () => {
  return (
    <Router> {/* ❌ Eliminamos basename */}
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/producto/:id" element={<ProductoDetalle />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-product/:id" element={<CreatePost />} /> {/* 🔥 Ruta dinámica para edición */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
