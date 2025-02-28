import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import { AuthContext } from "../context/AuthContext"; // 🔥 Importamos el contexto de autenticación

const Productos = () => {
  const { agregarProducto, mensaje } = useContext(CarritoContext); // 🔥 Se usa agregarProducto en vez de agregarAlCarrito
  const { user } = useContext(AuthContext); // 🔥 Obtener el usuario autenticado
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate(); // 🔥 Para redirigir a la página de edición

  // Petición al backend para obtener los productos
  useEffect(() => {
    fetch("https://crispy-cod-w5jw7gv9676cgj5-5000.app.github.dev/api/productos")
      .then((res) => res.json())
      .then((data) => {
        console.log("Productos cargados:", data); // Verificar en la consola
        setProductos(data);
      })
      .catch((error) => console.error("Error al cargar productos:", error));
  }, []);

  return (
    <div className="container my-5">
      {/* Mensaje flotante en la parte superior */}
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
          productos.map((producto) => (
            <div key={producto.id} className="col-lg-3 col-md-4 col-sm-6 mb-3">
              <div className="card h-100 shadow">
                <img
                  src={producto.imagen}
                  className="card-img-top img-fluid p-3"
                  alt={producto.nombre}
                  style={{ height: "250px", objectFit: "contain" }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/250x250?text=Imagen+No+Disponible";
                  }}
                />
                <div className="card-body text-center d-flex flex-column">
                  <h5 className="card-title">{producto.nombre}</h5>
                  <p className="card-text text-success fw-bold">
                    {new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(producto.precio)}
                  </p>
                  <button className="btn btn-success mt-auto mb-2" onClick={() => agregarProducto(producto)}>
                    🛒 Agregar al Carrito
                  </button>
                  <Link to={`/producto/${producto.id}`} className="btn btn-primary">Ver Más</Link>
                  {/* 🔥 Solo mostrar el botón de modificar si el usuario está autenticado */}
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
          ))
        ) : (
          <p className="text-center">Cargando productos...</p>
        )}
      </div>
    </div>
  );
};

export default Productos;
