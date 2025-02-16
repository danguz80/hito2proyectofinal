import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductoCard from "../components/ProductoCard";

const Productos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then((response) => setProductos(response.data))
      .catch((error) => console.error("Error al obtener productos", error));
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Lista de Productos</h2>
      <div className="row">
        {productos.map((producto) => (
          <ProductoCard key={producto.id} producto={producto} />
        ))}
      </div>
    </div>
  );
};

export default Productos;
