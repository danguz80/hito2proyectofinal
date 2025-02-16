import React from "react";
import { Link } from "react-router-dom";

// Importación de imágenes desde la carpeta assets/imgs
import img1 from "../assets/imgs/ROTOMARTILLO INAL 26MM.jpg";
import img2 from "../assets/imgs/SIERRA CIRCULAR INAL 185MM.jpg";
import img3 from "../assets/imgs/SOPLADOR ASPIRADOR INAL FULL 20V.jpg";


const Home = () => {
  return (
    <div>
      {/* Hero Section - Encabezado */}
      <header className="hero-section">
        <div className="container">
          <h1>Bienvenido a Tienda Total</h1>
          <p>Encuentra los mejores productos al mejor precio.</p>
          <Link to="/productos" className="btn btn-header btn-lg">Ver Productos</Link>
        </div>
      </header>

            {/* Sección de Productos Destacados */}
            <div className="container my-5">
        <h2 className="text-center mb-4" style={{ color: "#006066", fontWeight: "bold" }}>
          Productos Destacados
        </h2>
        <div className="row justify-content-center">
          
          {/* Producto 1 */}
          <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
            <div className="card h-100 shadow">
              <img 
                src={img1} 
                className="card-img-top img-fluid p-3" 
                alt="Rotomartillo Inalámbrico 26mm"
                style={{ height: "250px", objectFit: "contain" }} 
              />
              <div className="card-body text-center d-flex flex-column">
                <h5 className="card-title">Rotomartillo 26MM inalámbrico 20V Súper Total</h5>
                <p className="card-text text-success fw-bold">$73.941</p>
                <Link to="/productos" className="btn btn-primary mt-auto">Ver Más</Link>
              </div>
            </div>
          </div>

          {/* Producto 2 */}
          <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
            <div className="card h-100 shadow">
              <img 
                src={img2} 
                className="card-img-top img-fluid p-3" 
                alt="Sierra Circular Inalámbrica 185mm"
                style={{ height: "250px", objectFit: "contain" }} 
              />
              <div className="card-body text-center d-flex flex-column">
                <h5 className="card-title">Sierra Circular Inalámbrica 185mm 20V Súper Total</h5>
                <p className="card-text text-success fw-bold">$63.857</p>
                <Link to="/productos" className="btn btn-primary mt-auto">Ver Más</Link>
              </div>
            </div>
          </div>

          {/* Producto 3 */}
          <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
            <div className="card h-100 shadow">
              <img 
                src={img3} 
                className="card-img-top img-fluid p-3" 
                alt="Soplador Aspirador Inalámbrico Full 20V"
                style={{ height: "250px", objectFit: "contain" }} 
              />
              <div className="card-body text-center d-flex flex-column">
                <h5 className="card-title">Soplador Aspirador Inalámbrico 20V Full 20V Súper Total</h5>
                <p className="card-text text-success fw-bold">$12.597</p>
                <Link to="/productos" className="btn btn-primary mt-auto">Ver Más</Link>
              </div>
            </div>
          </div>

        </div>
      </div>


      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Tienda Total. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;
