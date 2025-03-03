import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/productos") // ⚠️ Asegúrate de que esta URL es correcta
      .then((res) => res.json())
      .then((data) => {
        console.log("Productos cargados:", data); // 👈 Verificar en la consola
        setProductos(data.slice(0, 3)); // 👈 Solo los primeros 3 productos
      })
      .catch((error) => console.error("Error al cargar productos:", error));
  }, []);

  return (
    <div>
      <header className="hero-section">
        <div className="container">
          <h1>Bienvenido a Tienda Total</h1>
          <p>Encuentra los mejores productos al mejor precio.</p>
          <Link to="/productos" className="btn btn-header btn-lg">
            Ver Productos
          </Link>
        </div>
      </header>

      {/* Sección de Productos Destacados */}
      <div className="container my-5">
        <h2 className="text-center mb-4" style={{ color: "#006066", fontWeight: "bold" }}>
          Productos Destacados
        </h2>
        <div className="row justify-content-center">
          {productos.map((producto) => (
            <div key={producto.id} className="col-lg-3 col-md-4 col-sm-6 mb-3">
              <div className="card h-100 shadow">
                <img
                  src={`http://localhost:5001/public/${producto.imagen}`} // ✅ Corrige la URL de la imagen
                  className="card-img-top img-fluid p-3"
                  alt={producto.nombre}
                  style={{ height: "250px", objectFit: "contain" }}
                />

                <div className="card-body text-center d-flex flex-column">
                  <h5 className="card-title">{producto.nombre}</h5>
                  <p className="card-text text-success fw-bold">
                    {new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(producto.precio)}
                  </p>
                  <Link to="/productos" className="btn btn-primary mt-auto">
                    Ver Más
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Tienda Total. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;
