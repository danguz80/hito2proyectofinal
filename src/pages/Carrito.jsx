import React, { useContext, useState, useEffect } from "react";
import { CarritoContext } from "../context/CarritoContext";

const Carrito = () => {
  const { carrito, eliminarProducto, vaciarCarritoCompleto, actualizarCantidadProducto, mensaje } = useContext(CarritoContext);
  const [cantidades, setCantidades] = useState({});

  // 📌 Cargar las cantidades iniciales cuando cambia el carrito
  useEffect(() => {
    if (!carrito || carrito.length === 0) {
      console.warn("⚠ Carrito vacío o no cargado aún.");
      setCantidades({});
      return;
    }

    const cantidadesIniciales = {};
    carrito.forEach((producto) => {
      // Validar que el producto tenga un ID válido
      if (producto?.producto_id || producto?.id) {
        const idProducto = producto.producto_id || producto.id; // Usar el ID correcto
        cantidadesIniciales[idProducto] = producto.cantidad || 1;
      } else {
        console.error("❌ Error: Producto sin ID detectado en el carrito:", producto);
      }
    });

    setCantidades(cantidadesIniciales);
    console.log("🔍 Estado actualizado del carrito:", carrito);
  }, [carrito]);

  // 📌 Función para calcular el total del carrito
  const calcularTotal = () => {
    return carrito.reduce((total, producto) => {
      const idProducto = producto.producto_id || producto.id; // Asegurar ID correcto
      const cantidad = cantidades[idProducto] || 1;
      return total + producto.precio * cantidad;
    }, 0);
  };

  console.log("🔍 Estado actual del carrito:", carrito);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">🛒 Carrito de Compras</h2>

      {mensaje && <div className="alert alert-success text-center fade show">{mensaje}</div>}

      {carrito.length > 0 && (
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-danger" onClick={vaciarCarritoCompleto}>Vaciar Carrito ❌</button>
        </div>
      )}

      {carrito.length === 0 ? (
        <p className="text-center">Tu carrito está vacío.</p>
      ) : (
        <div className="row">
          {carrito.map((producto) => {
            const idProducto = producto.producto_id || producto.id; // Asegurar ID correcto

            if (!idProducto) {
              console.error("❌ Producto sin ID detectado en el carrito:", producto);
              return null; // Evitar renderizar productos sin ID
            }

            return (
              <div key={idProducto} className="col-lg-4 col-md-6 col-sm-12 mb-4">
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
                        value={cantidades[idProducto]}
                        onChange={(e) => {
                          const nuevaCantidad = parseInt(e.target.value);
                          setCantidades((prev) => ({ ...prev, [idProducto]: nuevaCantidad }));
                          actualizarCantidadProducto(idProducto, nuevaCantidad);
                        }}
                        className="form-control w-25 text-center"
                      />
                    </div>
                    <button
                      className="btn btn-outline-danger mt-2"
                      onClick={() => {
                        console.log(`🛑 Intentando eliminar producto con ID: ${idProducto}`);
                        eliminarProducto(idProducto);
                      }}
                    >
                      Eliminar ❌
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
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
