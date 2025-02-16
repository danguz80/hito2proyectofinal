import React, { useContext, useState } from "react";
import { CarritoContext } from "../context/CarritoContext";

const Carrito = () => {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useContext(CarritoContext);
  const [compraExitosa, setCompraExitosa] = useState(false);
  const [cantidades, setCantidades] = useState(
    carrito.reduce((acc, producto) => ({ ...acc, [producto.id]: 1 }), {})
  );

  // Función para cambiar la cantidad del producto
  const actualizarCantidad = (id, nuevaCantidad) => {
    setCantidades((prev) => ({ ...prev, [id]: nuevaCantidad }));
  };

  // Función para calcular el total
  const calcularTotal = () => {
    return carrito.reduce(
      (total, producto) => total + producto.precio * (cantidades[producto.id] || 1),
      0
    );
  };

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
            <div key={producto.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <div className="card h-100 shadow p-3">
                <img
                  src={producto.imagen}
                  className="card-img-top img-fluid"
                  alt={producto.nombre}
                  style={{ height: "200px", objectFit: "contain" }}
                />
                <div className="card-body text-center d-flex flex-column">
                  <h5 className="card-title">{producto.nombre}</h5>
                  <p className="card-text text-success fw-bold">
                    {new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(producto.precio)}
                  </p>
                  <div className="d-flex justify-content-center align-items-center gap-2">
                    <label>Cantidad:</label>
                    <input
                      type="number"
                      min="1"
                      value={cantidades[producto.id]}
                      onChange={(e) => actualizarCantidad(producto.id, parseInt(e.target.value))}
                      className="form-control w-25 text-center"
                    />
                  </div>
                  <button className="btn btn-outline-danger mt-2" onClick={() => eliminarDelCarrito(producto.id)}>
                    Eliminar ❌
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {carrito.length > 0 && (
        <div className="text-center mt-4">
          <h4>Total:{" "}
            {new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(calcularTotal())}
          </h4>
        </div>
      )}
    </div>
  );
};

export default Carrito;
