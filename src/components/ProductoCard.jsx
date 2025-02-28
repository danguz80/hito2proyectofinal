import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";

const ProductoCard = ({ producto, onEliminar }) => {
  const { agregarProducto } = useContext(CarritoContext);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  // 🔥 Construcción correcta de la URL de la imagen
  const imageSrc = producto.imagen
    ? `${import.meta.env.BASE_URL}${producto.imagen.replace(/^\//, "")}`
    : `${import.meta.env.BASE_URL}default.jpg`; // Imagen por defecto

  const handleAgregar = () => {
    agregarProducto(producto);
    setMostrarMensaje(true);
    setTimeout(() => setMostrarMensaje(false), 2000);
  };

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
      <div className="card h-100 shadow">
        <img
          src={`${import.meta.env.BASE_URL}${producto.imagen}`}
          alt={producto.nombre}
          className="card-img-top img-fluid p-3"
          style={{ height: "220px", objectFit: "contain" }}
        />



        <div className="card-body text-center d-flex flex-column">
          <h5 className="card-title">{producto.nombre}</h5>
          <p className="card-text text-success fw-bold">${producto.precio}</p>

          {onEliminar ? (
            <button
              className="btn btn-outline-danger mt-auto"
              onClick={() => onEliminar(producto.id)}
            >
              Eliminar ❌
            </button>
          ) : (
            <>
              <button className="btn btn-primary mt-auto mb-2" onClick={handleAgregar}>
                Añadir al Carrito 🛒
              </button>
              {mostrarMensaje && (
                <div className="alert alert-success p-1" style={{ fontSize: "14px" }}>
                  ✅ Producto agregado!
                </div>
              )}
              <Link to={`/product/${producto.id}`} className="btn btn-outline-secondary">
                Ver Detalles
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductoCard;
