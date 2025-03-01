import React, { useContext, useState, useEffect } from "react";
import { CarritoContext } from "../context/CarritoContext";

const Carrito = () => {
  const { carrito, eliminarProducto, vaciarCarritoCompleto, actualizarCantidadProducto } = useContext(CarritoContext);
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
      if (producto?.producto_id || producto?.id) {
        const idProducto = producto.producto_id || producto.id;
        cantidadesIniciales[idProducto] = producto.cantidad || 1;
      } else {
        console.error("❌ Error: Producto sin ID detectado en el carrito:", producto);
      }
    });

    setCantidades(cantidadesIniciales);
  }, [carrito]);

  // 📌 Función para calcular el total del carrito
  const calcularTotal = () => {
    return carrito.reduce((total, producto) => {
      const idProducto = producto.producto_id || producto.id;
      const cantidad = cantidades[idProducto] || 1;
      return total + producto.precio * cantidad;
    }, 0);
  };

  // 📌 Finalizar compra y redirigir a la "Plataforma de Pago"
  const handleFinalizarCompra = () => {
    if (window.confirm("Serás redirigido a una página externa para realizar el pago.")) {
      const pagoWindow = window.open("", "_blank");

      if (pagoWindow) {
        pagoWindow.document.write(`
          <html>
            <head>
              <title>Plataforma de Pago</title>
              <style>
                body { text-align: center; font-family: Arial, sans-serif; padding: 50px; }
                button { background-color: green; color: white; padding: 10px 20px; border: none; cursor: pointer; font-size: 18px; }
                button:hover { background-color: darkgreen; }
              </style>
            </head>
            <body>
              <h1>Plataforma de Pago</h1>
              <p>Presiona el botón para confirmar tu compra.</p>
              <button id="btnComprar">Comprar</button>
              <script>
                document.getElementById("btnComprar").addEventListener("click", function() {
                  alert("✅ Compra realizada con éxito.");
                  window.opener.postMessage("compraExitosa", "*");
                  window.close();
                });
              </script>
            </body>
          </html>
        `);
      }
    }
  };

  // 📌 Vaciar carrito después de la compra exitosa
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data === "compraExitosa") {
        vaciarCarritoCompleto();
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">🛒 Carrito de Compras</h2>

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
            const idProducto = producto.producto_id || producto.id;

            if (!idProducto) {
              console.error("❌ Producto sin ID detectado en el carrito:", producto);
              return null;
            }

            return (
              <div key={idProducto} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="card h-100 shadow p-3">
                  <img
                    src={`${import.meta.env.BASE_URL}${producto.imagen.replace(/^\//, "")}`}
                    alt={producto.nombre}
                    className="card-img-top img-fluid p-3"
                    style={{ height: "220px", objectFit: "contain" }}
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
                      onClick={() => eliminarProducto(idProducto)}
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
          <button className="btn btn-success mt-3" onClick={handleFinalizarCompra}>
            Finalizar Compra 🏦
          </button>
        </div>
      )}
    </div>
  );
};

export default Carrito;
