import React, { useContext, useState } from "react";
import { CarritoContext } from "../context/CarritoContext";
import ProductoCard from "../components/ProductoCard";

const Carrito = () => {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useContext(CarritoContext);
  const [compraExitosa, setCompraExitosa] = useState(false);

  const finalizarCompra = () => {
    setCompraExitosa(true);
    setTimeout(() => {
      setCompraExitosa(false);
      vaciarCarrito();
    }, 3000);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">🛒 Carrito de Compras</h2>

      {compraExitosa && (
        <div className="alert alert-success text-center fade show">
          ✅ ¡Compra realizada con éxito! Gracias por tu compra.
        </div>
      )}

      {carrito.length > 0 && (
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-danger" onClick={vaciarCarrito}>
            Vaciar Carrito ❌
          </button>
          <button className="btn btn-success" onClick={finalizarCompra}>
            Finalizar Compra 🛍️
          </button>
        </div>
      )}

      {carrito.length === 0 ? (
        <p className="text-center">Tu carrito está vacío.</p>
      ) : (
        <div className="row">
          {carrito.map((producto) => (
            <ProductoCard key={producto.id} producto={producto} onEliminar={eliminarDelCarrito} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carrito;
