import React, { useContext } from "react";
import { useParams } from "react-router-dom";
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

// Array de productos con información detallada (Nombres corregidos para coincidir con Productos.jsx)
const productos = [
  { id: 1, nombre: "Taladro inalámbrico a 45NM 20V TOTAL", precio: 21840, imagen: img1, descripcion: "Herramienta potente para trabajos de impacto." },
  { id: 2, nombre: "Combo atornillador de impacto inalámbrico 285NM + taladro inalámbrico 52NM + 2 baterías 2AH + cargador SUPER TOTAL", precio: 95790, imagen: img2, descripcion: "Set de impacto con dos niveles de torque." },
  { id: 3, nombre: "Combo Llave de impacto inalámbrica 400NM 1/2 (13MM) 20V + set dados impacto + adaptador SUPER TOTAL", precio: 96630, imagen: img3, descripcion: "Kit profesional con múltiples accesorios." },
  { id: 4, nombre: "Llave de impacto inalámbrica 1/2 (13MM) 850NM 20V + 2 baterías 4AH + cargador SUPER TOTAL", precio: 132765, imagen: img4, descripcion: "Alta potencia para trabajos exigentes." },
  { id: 5, nombre: "Clavadora Inalámbrica para madera 50MM SUPER TOTAL", precio: 136966, imagen: img5, descripcion: "Perfecta para trabajos en carpintería." },
  { id: 6, nombre: "Combo 6 Baterías 2AH 20V + 1 cargador inteligente 20V SUPER TOTAL", precio: 105874, imagen: img6, descripcion: "Baterías para todas tus herramientas." },
  { id: 7, nombre: "Esmeril Angular 115MM 4 1/2 115MM 20V + 1 batería 4h + cargador + 10 discos SUPER TOTAL", precio: 87387, imagen: img7, descripcion: "Para cortes y desbastes precisos." },
  { id: 8, nombre: "Ingleteadora Inalámbrica 8 1/4 210MM 20V SUPER TOTAL", precio: 105034, imagen: img8, descripcion: "Cortes precisos en madera y más." },
  { id: 9, nombre: "Lijadora Roto Orbital Inalámbrica 20V TOTAL", precio: 41168, imagen: img9, descripcion: "Lijado profesional sin esfuerzo." },
  { id: 10, nombre: "Matraca Inalámbrica 3/8 10MM 20V SUPER TOTAL", precio: 37087, imagen: img10, descripcion: "Ergonómica y potente para aprietes seguros." },
  { id: 11, nombre: "Motosierra Inalámbrica 12 20V TOTAL", precio: 94950, imagen: img11, descripcion: "Potente y ligera para trabajos exigentes." },
  { id: 12, nombre: "Pistola Pintar Inalámbrica 800ML 0.1 - 0.2 bar 20V TOTAL", precio: 24361, imagen: img12, descripcion: "Pintura uniforme con pulverización de precisión." },
  { id: 13, nombre: "Podadora Inalámbrica 5'' 125MM 20V + batería 2ah + cargador SUPER TOTAL", precio: 44529, imagen: img13, descripcion: "Para cortes precisos en césped y arbustos." },
  { id: 14, nombre: "Pulidora Inalámbrica 125MM 20V TOTAL", precio: 96630, imagen: img14, descripcion: "Ideal para abrillantar superficies." },
  { id: 15, nombre: "Rotomartillo Inalámbrico 16MM 20V SUPER TOTAL", precio: 36966, imagen: img15, descripcion: "Alta potencia para perforaciones difíciles." },
  { id: 16, nombre: "Rotomartillo Inalámbrico 26MM 20V SUPER TOTAL", precio: 73941, imagen: img16, descripcion: "Para perforaciones en concreto y metal." },
  { id: 20, nombre: "Vibrador de Concreto Inalámbrico 20V SUPER TOTAL", precio: 42008, imagen: img20, descripcion: "Optimiza la compactación del concreto." },
];

const ProductoDetalle = () => {
  const { id } = useParams();
  const { agregarAlCarrito, mensaje } = useContext(CarritoContext);

  const producto = productos.find((p) => p.id === parseInt(id));

  if (!producto) {
    return <h2 className="text-center text-danger">Producto no encontrado</h2>;
  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6">
          <img src={producto.imagen} className="img-fluid" alt={producto.nombre} />
        </div>
        <div className="col-md-6">
          <h2>{producto.nombre}</h2>
          <p className="text-muted">{producto.descripcion}</p>
          <h4 className="text-success">
            {new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(producto.precio)}
          </h4>
          <button className="btn btn-success mb-2" onClick={() => agregarAlCarrito(producto)}>
            🛒 Agregar al Carrito
          </button>
          {mensaje && <div className="alert alert-success">{mensaje}</div>}
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalle;
