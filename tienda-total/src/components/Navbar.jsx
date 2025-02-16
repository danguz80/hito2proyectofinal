import { Link } from "react-router-dom";
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";

const Navbar = () => {
    const { carrito } = useContext(CarritoContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Tienda Total</Link>
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
                        <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/productos">Productos</Link></li>
                        <li className="nav-item">
                            <Link className="nav-link position-relative" to="/carrito">
                                🛒 Carrito
                                {carrito.length > 0 && (
                                    <span className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill">
                                        {carrito.length}
                                    </span>
                                )}
                            </Link>
                        </li>

                        <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/register">Registro</Link></li>

                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
