import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CarritoContext } from "../context/CarritoContext";

const ProductoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agregarAlCarrito } = useContext(CarritoContext);
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState(false); // Estado para el mensaje de éxito

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProducto(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener el producto", error);
        setLoading(false);
      });
  }, [id]);

  const handleAgregar = () => {
    agregarAlCarrito(producto);
    setMensaje(true);
    setTimeout(() => setMensaje(false), 2000); // Oculta el mensaje después de 2 segundos
  };

  if (loading) return <div className="text-center my-5"><h2>Cargando...</h2></div>;
  if (!producto) return <div className="text-center my-5"><h2>Producto no encontrado</h2></div>;

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card border-0 shadow-lg p-3">
            <img
              src={producto.image}
              alt={producto.title}
              className="card-img-top img-fluid"
              style={{ maxHeight: "450px", objectFit: "contain" }}
            />
          </div>
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-center">
          <h2 className="fw-bold">{producto.title}</h2>
          <p className="text-muted">{producto.category}</p>
          <h4 className="text-success fw-bold">${producto.price}</h4>
          <p>{producto.description}</p>

          <div className="d-flex flex-column gap-3">
            <button className="btn btn-primary btn-lg" onClick={handleAgregar}>
              Añadir al Carrito 🛒
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => navigate(-1)}>
              Volver a Productos
            </button>
          </div>

          {/* Mensaje de producto agregado exitosamente */}
          {mensaje && (
            <div className="alert alert-success mt-3 fade show" role="alert">
              ✅ Producto agregado al carrito!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalle;
