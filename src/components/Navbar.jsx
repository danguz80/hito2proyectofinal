import { Link } from "react-router-dom";
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { AuthContext } from "../context/AuthContext"; // Importamos el contexto de autenticación
import logo from "../assets/logo.png";

const Navbar = () => {
    const { carrito, obtenerCantidadTotal } = useContext(CarritoContext); // 🔥 Obtener función desde el contexto
    const { user, logout } = useContext(AuthContext); // Obtenemos el usuario y la función de logout

    return (
        <nav className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: "#ffffff", borderBottom: "3px solid #006066", zIndex: "1030" }}>
            <div className="container-fluid">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img src={logo} alt="Tienda Total" style={{ height: "70px", marginRight: "10px" }} />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item"><Link className="nav-link text-dark" to="/">Inicio</Link></li>
                        <li className="nav-item"><Link className="nav-link text-dark" to="/productos">Productos</Link></li>
                        <li className="nav-item position-relative">
                            <Link className="nav-link text-dark" to="/carrito">
                                🛒 Carrito
                                {carrito.length > 0 && (
                                    <span className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill">
                                    {obtenerCantidadTotal()} {/* 🔥 Usar la función correctamente */}
                                </span>                                
                                )}
                            </Link>
                        </li>

                        {/* Si el usuario está autenticado, mostrar "Profile" y "Cerrar Sesión" */}
                        {user ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link text-dark" to="/profile">👤 {user.name}</Link>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link btn btn-link text-dark" onClick={logout}>Cerrar Sesión</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item"><Link className="nav-link text-dark" to="/login">Login</Link></li>
                                <li className="nav-item"><Link className="nav-link text-dark" to="/register">Registro</Link></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
