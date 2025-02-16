import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";

const ProductoCard = ({ producto, onEliminar }) => {
  const { agregarAlCarrito, mensaje } = useContext(CarritoContext);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  const handleAgregar = () => {
    agregarAlCarrito(producto);
    setMostrarMensaje(true);
    setTimeout(() => setMostrarMensaje(false), 2000); // Oculta el mensaje después de 2s
  };

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
      <div className="card h-100 shadow">
        <img
          src={producto.image}
          className="card-img-top img-fluid p-3"
          alt={producto.title}
          style={{ height: "220px", objectFit: "contain" }}
        />
        <div className="card-body text-center d-flex flex-column">
          <h5 className="card-title">{producto.title}</h5>
          <p className="card-text text-success fw-bold">${producto.price}</p>
          {onEliminar ? (
            <button className="btn btn-outline-danger mt-auto" onClick={() => onEliminar(producto.id)}>
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
