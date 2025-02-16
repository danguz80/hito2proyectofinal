import { Link } from "react-router-dom";
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import logo from "../assets/logo.png";

const Navbar = () => {
    const { carrito } = useContext(CarritoContext);

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
                                        {carrito.length}
                                    </span>
                                )}
                            </Link>
                        </li>
                        <li className="nav-item"><Link className="nav-link text-dark" to="/login">Login</Link></li>
                        <li className="nav-item"><Link className="nav-link text-dark" to="/register">Registro</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
