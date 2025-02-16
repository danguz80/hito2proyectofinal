import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <header className="bg-primary text-white text-center py-5 w-100">
        <div className="container-fluid">
          <h1 className="display-4">Bienvenido a Tienda Total</h1>
          <p className="lead">Encuentra los mejores productos al mejor precio.</p>
          <Link to="/productos" className="btn btn-light btn-lg">Ver Productos</Link>
        </div>
      </header>

      {/* Sección de Productos Destacados */}
      <div className="container my-5">
        <h2 className="text-center mb-4">Productos Destacados</h2>
        <div className="row justify-content-center">
          {/* Producto 1 */}
          <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
            <div className="card h-100 shadow">
              <img 
                src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" 
                className="card-img-top img-fluid" 
                alt="Mochila Fjallraven"
                style={{ height: "250px", objectFit: "contain" }} 
              />
              <div className="card-body text-center">
                <h5 className="card-title">Mochila Fjallraven</h5>
                <p className="card-text">$109.95</p>
                <Link to="/productos" className="btn btn-primary">Ver Más</Link>
              </div>
            </div>
          </div>

          {/* Producto 2 */}
          <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
            <div className="card h-100 shadow">
              <img 
                src="https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg" 
                className="card-img-top img-fluid" 
                alt="Camisa Slim Fit"
                style={{ height: "250px", objectFit: "contain" }} 
              />
              <div className="card-body text-center">
                <h5 className="card-title">Camisa Slim Fit</h5>
                <p className="card-text">$22.3</p>
                <Link to="/productos" className="btn btn-primary">Ver Más</Link>
              </div>
            </div>
          </div>

          {/* Producto 3 */}
          <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
            <div className="card h-100 shadow">
              <img 
                src="https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg" 
                className="card-img-top img-fluid" 
                alt="Chaqueta de Algodón"
                style={{ height: "250px", objectFit: "contain" }} 
              />
              <div className="card-body text-center">
                <h5 className="card-title">Chaqueta de Algodón</h5>
                <p className="card-text">$55.99</p>
                <Link to="/productos" className="btn btn-primary">Ver Más</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 w-100">
        <p>&copy; 2025 Tienda Total. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;
