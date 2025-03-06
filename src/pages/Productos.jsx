import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import { AuthContext } from "../context/AuthContext";

const Productos = () => {
  const { agregarProducto, mensaje } = useContext(CarritoContext);
  const { user } = useContext(AuthContext);
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/productos`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Productos cargados:", data);
        setProductos(data);
      })
      .catch((error) => console.error("Error al cargar productos:", error));
  }, []);

  return (
    <div className="container my-5">
      {mensaje && (
        <div className="alert alert-success text-center fixed-top w-50 mx-auto mt-3" style={{ zIndex: "1050" }}>
          {mensaje}
        </div>
      )}

      <h2 className="text-center mb-4" style={{ color: "#006066", fontWeight: "bold" }}>
        Todos los Productos
      </h2>

      <div className="row justify-content-center">
        {productos.length > 0 ? (
          productos.map((producto) => {
            // 🔥 Cálculo del precio con descuento si aplica
            const precioFinal = producto.oferta > 0
              ? producto.precio - (producto.precio * producto.oferta / 100)
              : producto.precio;

            return (
              <div key={producto.id} className="col-lg-3 col-md-4 col-sm-6 mb-3">
                <div className="card h-100 shadow">
                  <img
                    src={producto.imagen}  // VITE_API_URL
                    className="card-img-top img-fluid p-3"
                    alt={producto.nombre}
                    style={{ height: "250px", objectFit: "contain" }}
                    onError={(e) => {
                      console.log("❌ Imagen no encontrada:", e.target.src);
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/250x250.png?text=Sin+Imagen";
                    }}
                  />

                  <div className="card-body text-center d-flex flex-column">
                    <h5 className="card-title">{producto.nombre}</h5>

                    {/* 🔥 Mostrar precio con oferta si aplica */}
                    {producto.oferta > 0 ? (
                      <p className="card-text">
                        <span className="text-muted text-decoration-line-through">
                          {new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(producto.precio)}
                        </span>
                        <br />
                        <span className="text-danger fw-bold">
                          {new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(precioFinal)}
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

                    <button className="btn btn-success mt-auto mb-2" onClick={() => agregarProducto(producto)}>
                      🛒 Agregar al Carrito
                    </button>
                    <Link to={`/producto/${producto.id}`} className="btn btn-primary">Ver Más</Link>

                    {user && (
                      <button
                        onClick={() => navigate(`/edit-product/${producto.id}`)}
                        className="btn btn-warning mt-2"
                      >
                        Modificar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center">Cargando productos...</p>
        )}
      </div>
    </div>
  );
};

export default Productos;
