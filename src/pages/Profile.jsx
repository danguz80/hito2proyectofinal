import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { 
  getProductos, createProducto, deleteProducto, 
  getUsuarios, updateUsuario, deleteUsuario 
} from "../services/api";

const Profile = () => {
  const { user, isAdmin, logout } = useContext(AuthContext);
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [newProduct, setNewProduct] = useState({ nombre: "", descripcion: "", precio: "", imagen: "" });
  const navigate = useNavigate();

  // 🔥 Formateo de moneda CLP
  const formatoCLP = (precio) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    }).format(precio);
  };

  // 🔹 Cargar productos
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await getProductos();
        setProductos(data);
      } catch (error) {
        console.error("❌ Error al obtener productos:", error);
      }
    };
    fetchProductos();
  }, []);

  // 🔹 Cargar usuarios (solo si es admin)
  useEffect(() => {
    if (isAdmin) {
      const fetchUsuarios = async () => {
        try {
          const data = await getUsuarios();
          setUsuarios(data.map(u => ({
            id: u.id,
            name: u.nombre,  // 🔥 Convertimos "nombre" a "name"
            email: u.email,
            role: u.rol || "user",  // 🔥 Convertimos "rol" a "role"
          })));
          
      
          // 🔍 Agrega este console.log para verificar los datos antes de renderizarlos
          console.log("👥 Usuarios cargados:", data);
        } catch (error) {
          console.error("❌ Error al obtener usuarios:", error);
        }
      };
      
      fetchUsuarios();
    }
  }, [isAdmin]);

  // 🔹 Crear nuevo producto
  const handleCreateProduct = async () => {
    if (!newProduct.nombre || !newProduct.precio) {
      alert("❌ Nombre y precio son obligatorios");
      return;
    }
    try {
      const productoCreado = await createProducto(newProduct);
      setProductos([...productos, productoCreado]);
      setNewProduct({ nombre: "", descripcion: "", precio: "", imagen: "" });
      alert("✅ Producto agregado correctamente");
    } catch (error) {
      console.error("❌ Error al agregar producto:", error);
      alert("❌ Error al agregar el producto");
    }
  };

  // 🔹 Eliminar producto
  const handleDeleteProduct = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este producto?")) return;
    try {
      await deleteProducto(id);
      setProductos(productos.filter(p => p.id !== id));
      alert("✅ Producto eliminado correctamente");
    } catch (error) {
      console.error("❌ Error al eliminar producto:", error);
      alert("❌ Error al eliminar el producto");
    }
  };

  // 🔹 Manejo de cambios en usuarios (Nombre, Email y Rol)
  const handleChangeUsuario = (id, campo, valor) => {
    setUsuarios((prevUsuarios) =>
      prevUsuarios.map((usuario) =>
        usuario.id === id ? { ...usuario, [campo]: valor } : usuario
      )
    );
  };

  // 🔹 Actualizar usuario
  const handleUpdateUsuario = async (id) => {
    const usuarioActualizado = usuarios.find((u) => u.id === id);
    try {
      await updateUsuario(id, usuarioActualizado);
      alert("✅ Usuario actualizado correctamente");
    } catch (error) {
      console.error("❌ Error al actualizar usuario:", error);
      alert("❌ Error al actualizar usuario");
    }
  };

  // 🔹 Eliminar usuario
  const handleDeleteUsuario = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) return;
    try {
      await deleteUsuario(id);
      setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
      alert("✅ Usuario eliminado correctamente");
    } catch (error) {
      console.error("❌ Error al eliminar usuario:", error);
      alert("❌ Error al eliminar usuario");
    }
  };

  if (!user) return <h2>Debes iniciar sesión</h2>;

  return (
    <div className="container">
      <h2 className="mt-3">Bienvenido, {user.name}</h2>
      <button onClick={logout} className="btn btn-danger mb-3">Cerrar Sesión</button>

      {/* 🔥 SECCIÓN DE ADMINISTRACIÓN DE PRODUCTOS */}
      {isAdmin && (
        <div>
          <h3>Administración de Productos</h3>
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

          <h3 className="mt-4">Lista de Productos</h3>
          <ul className="list-group">
            {productos.map((p) => (
              <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{p.nombre} - {formatoCLP(p.precio)}</span>
                <div>
                  <button onClick={() => navigate(`/edit-product/${p.id}`)} className="btn btn-warning btn-sm mx-2">Actualizar</button>
                  <button onClick={() => handleDeleteProduct(p.id)} className="btn btn-danger btn-sm">Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 🔥 SECCIÓN DE ADMINISTRACIÓN DE USUARIOS */}
      {isAdmin && (
        <div className="mt-5">
          <h3>Administración de Usuarios</h3>
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td><input type="text" value={usuario.name} onChange={(e) => handleChangeUsuario(usuario.id, "name", e.target.value)} className="form-control" /></td>
                  <td>{usuario.email}</td>
                  <td>
                    <select value={usuario.role} onChange={(e) => handleChangeUsuario(usuario.id, "role", e.target.value)} className="form-select">
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td>
                    <button className="btn btn-success btn-sm me-2" onClick={() => handleUpdateUsuario(usuario.id)}>Actualizar</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteUsuario(usuario.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Profile;
