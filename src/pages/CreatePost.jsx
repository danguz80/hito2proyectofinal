import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductos, updateProducto } from "../services/api";

const CreatePost = () => {
  const { id } = useParams(); // Obtener el ID del producto desde la URL
  const navigate = useNavigate(); // Para redirigir después de actualizar
  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: "",
  });

  // Función para formatear los precios en CLP sin decimales
  const formatoCLP = (precio) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0, // 🔥 Sin decimales
    }).format(precio);
  };

  // Cargar los datos del producto actual al abrir la página
  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const productos = await getProductos();
        const productoEncontrado = productos.find(p => p.id === parseInt(id));
        if (productoEncontrado) {
          setProducto(productoEncontrado);
        }
      } catch (error) {
        console.error("Error al cargar el producto:", error);
      }
    };
    fetchProducto();
  }, [id]);

  // Manejo de cambios en el formulario
  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  // Guardar los cambios en la base de datos
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProducto(id, producto);
      alert("✅ Producto actualizado correctamente");
      navigate("/profile"); // Redirigir al perfil después de actualizar
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      alert("❌ Error al actualizar el producto");
    }
  };

  return (
    <div className="container">
      <h2 className="mt-3">Editar Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={producto.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            name="descripcion"
            value={producto.descripcion}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input
            type="number"
            className="form-control"
            name="precio"
            value={producto.precio}
            onChange={handleChange}
            required
          />
          <small className="text-muted">Precio actual: {formatoCLP(producto.precio)}</small>
        </div>
        <div className="mb-3">
          <label className="form-label">Imagen (URL)</label>
          <input
            type="text"
            className="form-control"
            name="imagen"
            value={producto.imagen}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default CreatePost;
