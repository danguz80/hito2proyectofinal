import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import { AuthContext } from "../context/AuthContext"; // 🔥 Importamos el contexto de autenticación

const ProductoDetalle = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // 🔥 Para redirigir a la edición
    const { agregarProducto, mensaje } = useContext(CarritoContext); // 🔥 Cambiado a agregarProducto
    const { user } = useContext(AuthContext); // 🔥 Obtener el usuario autenticado
    const [producto, setProducto] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Obteniendo producto con ID:", id);  // 👈 Verificar en consola
        fetch(`http://localhost:5001/api/productos/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Error al obtener el producto");
                }
                return res.json();
            })
            .then((data) => {
                console.log("Producto cargado:", data);  // 👈 Verificar datos en consola
                setProducto(data);
            })
            .catch((error) => {
                console.error("Error cargando el producto:", error);
                setError("No se pudo cargar el producto.");
            });
    }, [id]);

    if (error) {
        return <h2 className="text-center text-danger">{error}</h2>;
    }

    if (!producto) {
        return <h2 className="text-center">Cargando...</h2>;
    }

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-6">
                    <img
                        src={`http://localhost:5001/public/${producto.imagen}`}
                        className="img-fluid"
                        alt={producto.nombre}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/250?text=Sin+Imagen";
                        }}
                    />

                </div>
                <div className="col-md-6">
                    <h2>{producto.nombre}</h2>
                    <p className="text-muted">{producto.descripcion}</p>
                    <h4 className="text-success">
                        {new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(producto.precio)}
                    </h4>
                    <button className="btn btn-success mb-2" onClick={() => agregarProducto(producto)}>
                        🛒 Agregar al Carrito
                    </button>
                    {mensaje && <div className="alert alert-success">{mensaje}</div>}
                    {/* 🔥 Solo mostrar el botón de modificar si el usuario está autenticado */}
                    {user && (
                        <button onClick={() => navigate(`/edit-product/${producto.id}`)} className="btn btn-warning ms-2">
                            Modificar
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductoDetalle;
