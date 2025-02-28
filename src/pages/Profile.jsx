import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 🔥 Hook para redirección
import { AuthContext } from "../context/AuthContext";
import { getProductos, createProducto, deleteProducto } from "../services/api";

const Profile = () => {
  const { user, isAdmin, logout } = useContext(AuthContext);
  const [productos, setProductos] = useState([]);
  const [newProduct, setNewProduct] = useState({ nombre: "", descripcion: "", precio: "", imagen: "" });
  const navigate = useNavigate(); // 🔥 Para redirigir a la página de edición

  // Función para formatear los precios en pesos chilenos (CLP) sin decimales
  const formatoCLP = (precio) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0, // 🔥 Sin decimales
    }).format(precio);
  };

  // Cargar productos al entrar
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await getProductos();
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };
    fetchProductos();
  }, []);

  // Crear un nuevo producto
  const handleCreateProduct = async () => {
    if (!newProduct.nombre || !newProduct.precio) {
      alert("❌ Nombre y precio son obligatorios");
      return;
    }
    try {
      const productoCreado = await createProducto(newProduct);
      setProductos([...productos, productoCreado]);
      setNewProduct({ nombre: "", descripcion: "", precio: "", imagen: "" });
      alert("✅ Producto agregado correctamente"); // 🔥 Mensaje de confirmación
    } catch (error) {
      console.error("Error al agregar producto:", error);
      alert("❌ Error al agregar el producto");
    }
  };

  // Eliminar producto con confirmación
  const handleDeleteProduct = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este producto?")) return; // 🔥 Confirmación antes de eliminar
    try {
      await deleteProducto(id);
      setProductos(productos.filter(p => p.id !== id));
      alert("✅ Producto eliminado correctamente"); // 🔥 Mensaje de éxito
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      alert("❌ Error al eliminar el producto");
    }
  };

  if (!user) return <h2>Debes iniciar sesión</h2>;

  return (
    <div className="container">
      <h2 className="mt-3">Bienvenido, {user.name}</h2>
      <button onClick={logout} className="btn btn-danger mb-3">Cerrar Sesión</button>

      {isAdmin && (
        <div>
          <h3>Administración de Productos</h3>
          {/* Formulario para agregar producto */}
          <div className="mb-3">
            <input type="text" placeholder="Nombre" className="form-control mb-2"
              value={newProduct.nombre} onChange={(e) => setNewProduct({ ...newProduct, nombre: e.target.value })} />
            <input type="text" placeholder="Descripción" className="form-control mb-2"
              value={newProduct.descripcion} onChange={(e) => setNewProduct({ ...newProduct, descripcion: e.target.value })} />
            <input type="number" placeholder="Precio" className="form-control mb-2"
              value={newProduct.precio} onChange={(e) => setNewProduct({ ...newProduct, precio: e.target.value })} />
            <input type="text" placeholder="URL Imagen" className="form-control mb-2"
              value={newProduct.imagen} onChange={(e) => setNewProduct({ ...newProduct, imagen: e.target.value })} />
            <button onClick={handleCreateProduct} className="btn btn-success w-100">Agregar Producto</button>
          </div>

          {/* Lista de productos */}
          <h3 className="mt-4">Lista de Productos</h3>
          <ul className="list-group">
            {productos.map((p) => (
              <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{p.nombre} - {formatoCLP(p.precio)}</span> {/* 🔥 Aplicamos formato CLP */}
                <div>
                  <button onClick={() => navigate(`/edit-product/${p.id}`)} className="btn btn-warning btn-sm mx-2">Actualizar</button>
                  <button onClick={() => handleDeleteProduct(p.id)} className="btn btn-danger btn-sm">Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!isAdmin && (
        <h3 className="mt-4">No tienes permisos de administrador</h3>
      )}
    </div>
  );
};

export default Profile;
