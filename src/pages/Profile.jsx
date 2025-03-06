import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  getProductos, createProducto, updateProducto, deleteProducto,
  getUsuarios, updateUsuario, deleteUsuario
} from "../services/api";

const Profile = () => {
  const { user, isAdmin, logout } = useContext(AuthContext);
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [newProduct, setNewProduct] = useState({ nombre: "", descripcion: "", precio: "", imagen: "", oferta: 0 });
  const [ofertasTemp, setOfertasTemp] = useState({}); // 🔥 Estado temporal para la oferta
  const navigate = useNavigate();

  // 🔥 Formato de moneda CLP
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

        // 🔥 Inicializa el estado temporal con las ofertas actuales
        const ofertasIniciales = {};
        data.forEach(producto => {
          ofertasIniciales[producto.id] = producto.oferta || 0;
        });
        setOfertasTemp(ofertasIniciales);
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
          const token = localStorage.getItem("token");
          if (!token) {
            console.error("❌ No hay token disponible");
            return;
          }

          const res = await fetch("https://hito2proyectofinal.onrender.com/api/usuarios", {
            headers: { Authorization: `Bearer ${token}` }
          });

          if (!res.ok) {
            throw new Error("❌ Error en la API de usuarios");
          }

          const data = await res.json();
          setUsuarios(data.map(u => ({
            id: u.id,
            name: u.nombre,
            email: u.email,
            role: u.rol || "user",
          })));

          console.log("👥 Usuarios cargados:", data);
        } catch (error) {
          console.error("❌ Error al obtener usuarios:", error);
        }
      };

      fetchUsuarios();
    }
  }, [isAdmin]);

  // 🔹 Crear nuevo producto (reintegrado)
  const handleCreateProduct = async () => {
    if (!newProduct.nombre || !newProduct.precio) {
      alert("❌ Nombre y precio son obligatorios");
      return;
    }
    try {
      const productoCreado = await createProducto(newProduct);
      setProductos([...productos, productoCreado]);
      setNewProduct({ nombre: "", descripcion: "", precio: "", imagen: "", oferta: 0 });
      alert("✅ Producto agregado correctamente");
    } catch (error) {
      console.error("❌ Error al agregar producto:", error);
      alert("❌ Error al agregar el producto");
    }
  };

  // 🔹 Manejo de cambios en oferta con confirmación en Enter o blur
  const handleOfertaChange = (id, value) => {
    setOfertasTemp((prev) => ({ ...prev, [id]: value }));
  };

  const handleOfertaUpdate = async (id) => {
    const nuevaOferta = ofertasTemp[id];

    if (nuevaOferta < 0 || nuevaOferta > 100) {
      alert("❌ La oferta debe estar entre 0 y 100%");
      return;
    }

    try {
      const productoActualizado = productos.find((p) => p.id === id);
      const updatedProduct = { ...productoActualizado, oferta: nuevaOferta };

      await updateProducto(id, updatedProduct);

      setProductos(productos.map((p) => (p.id === id ? updatedProduct : p)));

      alert("✅ Oferta actualizada correctamente");
    } catch (error) {
      console.error("❌ Error al actualizar oferta:", error);
      alert("❌ Error al actualizar oferta");
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
            <input type="number" placeholder="Oferta (%)" className="form-control mb-2"
              value={newProduct.oferta} onChange={(e) => setNewProduct({ ...newProduct, oferta: e.target.value })} />
            <button onClick={handleCreateProduct} className="btn btn-success w-100">Agregar Producto</button>
          </div>

          <h3 className="mt-4">Lista de Productos</h3>
          <ul className="list-group">
            {productos.map((p) => (
              <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{p.nombre} - {formatoCLP(p.precio)}</span>
                {p.oferta > 0 && <span className="text-danger ms-2">🔥 {p.oferta}% OFF</span>}
                
                <div>
                  {/* 🔥 Input de oferta con actualización en Enter o Blur */}
                  <input 
                    type="number" 
                    value={ofertasTemp[p.id]} 
                    className="form-control form-control-sm d-inline-block w-25 me-2"
                    onChange={(e) => handleOfertaChange(p.id, e.target.value)}
                    onBlur={() => handleOfertaUpdate(p.id)}
                    onKeyDown={(e) => e.key === "Enter" && handleOfertaUpdate(p.id)}
                  />

                  <button onClick={() => navigate(`/edit-product/${p.id}`)} className="btn btn-warning btn-sm mx-2">
                    Modificar
                  </button>

                  <button onClick={() => handleDeleteProduct(p.id)} className="btn btn-danger btn-sm">
                    Eliminar
                  </button>
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
          {usuarios.length === 0 ? (
            <p className="text-muted">No hay usuarios registrados.</p>
          ) : (
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
                    <td>
                      <input
                        type="text"
                        value={usuario.name}
                        onChange={(e) => handleChangeUsuario(usuario.id, "name", e.target.value)}
                        className="form-control"
                      />
                    </td>
                    <td>{usuario.email}</td>
                    <td>
                      <select
                        value={usuario.role}
                        onChange={(e) => handleChangeUsuario(usuario.id, "role", e.target.value)}
                        className="form-select"
                      >
                        <option value="user">Usuario</option>
                        <option value="admin">Administrador</option>
                      </select>
                    </td>
                    <td>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => handleUpdateUsuario(usuario.id)}
                      >
                        Actualizar
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteUsuario(usuario.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>    
  );
};

export default Profile;
