import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";

// Importación de imágenes desde la carpeta assets/imgs
import img1 from "../assets/imgs/45NM.jpg";
import img2 from "../assets/imgs/285NM + 52NM COMBO.jpg";
import img3 from "../assets/imgs/400NM COMBO.jpg";
import img4 from "../assets/imgs/850NM.jpg";
import img5 from "../assets/imgs/CLAVADORA INAL MADERA 50MM.jpg";
import img6 from "../assets/imgs/COMBO 6 BATERIAS 2AH 20V.jpg";
import img7 from "../assets/imgs/ESMERIL ANG 115MM.jpg";
import img8 from "../assets/imgs/INGLETEADORA INAL 210MM.jpg";
import img9 from "../assets/imgs/LIJADORA ROTO ORBITAL INAL 20V.jpg";
import img10 from "../assets/imgs/MATRACA INAL 10MM.jpg";
import img11 from "../assets/imgs/MOTOSIERRA INAL12.png";
import img12 from "../assets/imgs/PISTOLA PINTAR INAL 800ML.jpg";
import img13 from "../assets/imgs/PODADORA INAL 5.jpg";
import img14 from "../assets/imgs/PULIDORA INAL 125MM.png";
import img15 from "../assets/imgs/ROTOMARTILLO INAL 16MM.jpg";
import img16 from "../assets/imgs/ROTOMARTILLO INAL 26MM.jpg";
import img17 from "../assets/imgs/SIERRA CIRCULAR INAL 185MM.jpg";
import img18 from "../assets/imgs/SIERRA CLADORA INAL 20V.png";
import img19 from "../assets/imgs/SOPLADOR ASPIRADOR INAL FULL 20V.jpg";
import img20 from "../assets/imgs/VIBRADOR CONCRETO INAL 20V.jpg";

// Array de Productos con sus datos
const productos = [
  { id: 1, nombre: "Taladro inalámbrico a 45NM 20V TOTAL", precio: 21840, imagen: img1 },
  { id: 2, nombre: "Combo atornillador de impacto inalámbrico 285NM + taladro inalámbrico 52NM + 2 baterías 2AH + cargador SUPER TOTAL", precio: 95790, imagen: img2 },
  { id: 3, nombre: "Combo Llave de impacto inalámbrica 400NM 1/2 (13MM) 20V + set dados impacto + adaptador SUPER TOTAL", precio: 96630, imagen: img3 },
  { id: 4, nombre: "Llave de impacto inalámbrica 1/2 (13MM) 850NM 20V + 2 baterías 4AH + cargador SUPER TOTAL", precio: 132765, imagen: img4 },
  { id: 5, nombre: "Clavadora Inalámbrica para madera 50MM SUPER TOTAL", precio: 136966, imagen: img5 },
  { id: 6, nombre: "Combo 6 Baterías 2AH 20V + 1 cargador inteligente 20V SUPER TOTAL", precio: 105874, imagen: img6 },
  { id: 7, nombre: "Esmeril Angular 115MM 4 1/2 115MM 20V + 1 batería 4h + cargador + 10 discos SUPER TOTAL", precio: 87387, imagen: img7 },
  { id: 8, nombre: "Ingleteadora Inalámbrica 8 1/4 210MM 20V SUPER TOTAL", precio: 105034, imagen: img8 },
  { id: 9, nombre: "Lijadora Roto Orbital Inalámbrica 20V TOTAL", precio: 41168, imagen: img9 },
  { id: 10, nombre: "Matraca Inalámbrica 3/8 10MM 20V SUPER TOTAL", precio: 37087, imagen: img10 },
  { id: 11, nombre: "Motosierra Inalámbrica 12 20V TOTAL", precio: 94950, imagen: img11 },
  { id: 12, nombre: "Pistola Pintar Inalámbrica 800ML 0.1 - 0.2 bar 20V TOTAL", precio: 24361, imagen: img12 },
  { id: 13, nombre: "Podadora Inalámbrica 5'' 125MM 20V + batería 2ah + cargador SUPER TOTAL", precio: 44529, imagen: img13 },
  { id: 14, nombre: "Pulidora Inalámbrica 125MM 20V TOTAL", precio: 96630, imagen: img14 },
  { id: 15, nombre: "Rotomartillo Inalámbrico 16MM 20V SUPER TOTAL", precio: 36966, imagen: img15 },
  { id: 16, nombre: "Rotomartillo Inalámbrico 26MM 20V SUPER TOTAL", precio: 73941, imagen: img16 },
  { id: 17, nombre: "Sierra Circular Inalámbrica 185MM 20V SUPER TOTAL", precio: 63857, imagen: img17 },
  { id: 18, nombre: "Sierra Caladora Inalámbrica 20V TOTAL", precio: 47050, imagen: img18 },
  { id: 19, nombre: "Soplador Aspirador Inalámbrico Full 20V SUPER TOTAL", precio: 12597, imagen: img19 },
  { id: 20, nombre: "Vibrador de Concreto Inalámbrico 20V SUPER TOTAL", precio: 42008, imagen: img20 },
];

const Productos = () => {
  const { agregarAlCarrito, mensaje } = useContext(CarritoContext);

  return (
    <div className="container my-5">
      {/* Mensaje flotante en la parte superior */}
      {mensaje && (
        <div className="alert alert-success text-center fixed-top w-50 mx-auto mt-3" style={{ zIndex: "1050" }}>
          {mensaje}
        </div>
      )}

      <h2 className="text-center mb-4" style={{ color: "#006066", fontWeight: "bold" }}>
        Todos los Productos
      </h2>

      <div className="row justify-content-center">
        {productos.map((producto) => (
          <div key={producto.id} className="col-lg-3 col-md-4 col-sm-6 mb-3">
            <div className="card h-100 shadow">
              <img
                src={producto.imagen}
                className="card-img-top img-fluid p-3"
                alt={producto.nombre}
                style={{ height: "250px", objectFit: "contain" }}
              />
              <div className="card-body text-center d-flex flex-column">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text text-success fw-bold">
                  {new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(producto.precio)}
                </p>
                <button className="btn btn-success mt-auto mb-2" onClick={() => agregarAlCarrito(producto)}>
                  🛒 Agregar al Carrito
                </button>
                <Link to={`/producto/${producto.id}`} className="btn btn-primary">Ver Más</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;
