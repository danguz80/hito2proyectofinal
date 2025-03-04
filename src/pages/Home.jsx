import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/productos/destacados") // ✅ API para productos con mayor oferta
      .then((res) => res.json())
      .then((data) => {
        console.log("Productos destacados cargados:", data);
        setProductos(data.slice(0, 3)); // ✅ Solo los 3 productos con mayores ofertas
      })
      .catch((error) => console.error("Error al cargar productos destacados:", error));
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
          {productos.length > 0 ? (
            productos.map((producto) => (
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

                    {/* Muestra precio con oferta si existe */}
                    {/* 🔥 Mostrar precio con oferta si aplica */}
                    {producto.oferta > 0 ? (
                      <p className="card-text">
                        <span className="text-muted text-decoration-line-through">
                          {new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(producto.precio)}
                        </span>
                        <br />
                        <span className="text-danger fw-bold">
                          {new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(
                            producto.precio - (producto.precio * producto.oferta) / 100
                          )}
                        </span>
                        <br />
                        <span className="badge bg-danger text-white p-2 mb-2 d-inline-block">
                          🔥 {producto.oferta}% OFF
                        </span>
                      </p>
                    ) : (
                      <p className="card-text text-success fw-bold">
                        {new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(producto.precio)}
                      </p>
                    )}


                    <Link to={`/producto/${producto.id}`} className="btn btn-primary mt-auto">
                      Ver Más
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted">No hay productos destacados en oferta.</p>
          )}
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
