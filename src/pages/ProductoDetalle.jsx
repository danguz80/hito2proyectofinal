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
import img19 from "../assets/imgs/SOPLADOR ASPIRADOR INAL FULL 20V.jpg"
import img20 from "../assets/imgs/VIBRADOR CONCRETO INAL 20V.jpg";

// Array de productos con información detallada
const productos = [
  {
    id: 1, nombre: "Taladro inalámbrico a 45NM 20V TOTAL", precio: 21840, imagen: img1, descripcion: 
    "Potente motor de 20V para trabajos exigentes. Torque de 45Nm para perforación eficiente. Portabrocas de 10mm para cambios rápidos de brocas. Ajustes de par 15+1 para diversos materiales. Luz LED integrada para trabajar en áreas oscuras. Garantía de 12 meses para tranquilidad del usuario." },
  { id: 2, nombre: "Combo atornillador de impacto inalámbrico 285NM + taladro inalámbrico 52NM + 2 baterías 2AH + cargador SUPER TOTAL", precio: 95790, imagen: img2, descripcion: 
    "Potente taladro inalámbrico 20V con 52Nm de torque. Atornillador de impacto Brushless de 285Nm. Incluye dos baterías de 2Ah y cargador. Set de 47 accesorios para distintas tareas. Embalaje en maletín para transporte fácil. Garantía de 12 meses incluida." },
  { id: 3, nombre: "Combo Llave de impacto inalámbrica 400NM 1/2 (13MM) 20V + set dados impacto + adaptador SUPER TOTAL", precio: 96630, imagen: img3, descripcion: 
    "Ideal para trabajos pesados y precisos. Potente motor de 400 Nm de torque. Incluye 2 baterías y cargador rápida. Bolsa de lona resistente para facilitar transporte. Incluye set de dados y adaptador para destornillador. Garantía de 12 meses incluida." },
  { id: 4, nombre: "Llave de impacto inalámbrica 1/2 (13MM) 850NM 20V + 2 baterías 4AH + cargador SUPER TOTAL", precio: 132765, imagen: img4, descripcion: 
    "Potente motor sin escobillas para trabajos pesados. Par de torsión excepcional de 850nm. Set de dados incluido para múltiples tamaños. Diseño ergonómico para control y comodidad. Luz LED integrada para mayor visibilidad. Batería y cargador vendidos por separado." },
  { id: 5, nombre: "Clavadora Inalámbrica para madera 50MM SUPER TOTAL", precio: 136966, imagen: img5, descripcion: 
    "Tecnología sin escobillas para mayor durabilidad. Ideal para trabajos de carpintería y construcción. Incluye 1000 clavos y 2 accesorios. Diseño inalámbrico para fácil movilidad. Batería de 20V para un rendimiento constante. Garantía de 12 meses incluida." },
  { id: 6, nombre: "Combo 6 Baterías 2AH 20V + 1 cargador inteligente 20V SUPER TOTAL", precio: 105874, imagen: img6, descripcion: 
    "Baterías de litio-ion de 20v y 2 amperes. Cargador inteligente compatible con baterías de 2, 4, 5 amperes. Indicador led de carga en las baterías. Garantía de 12 meses incluida. Maleta de transporte para facilitar la movilidad. Ideal para uso con diversas herramientas inalámbricas TOTAL." },
  { id: 7, nombre: "Esmeril Angular 115MM 4 1/2 115MM 20V + 1 batería 4h + cargador + 10 discos SUPER TOTAL", precio: 87387, imagen: img7, descripcion: 
    "Motor Brushless para mayor eficiencia y durabilidad. Potente voltaje de 20v para trabajos industriales. Velocidad en vacío de 3000/8000rpm, para cortes precisos. Incluye batería 4Ah y cargador para potencia continua. 10 discos versátiles para cortes, desbastes y pulidos. Diseño seguro y ergonómico, con interruptor de seguridad." },
  { id: 8, nombre: "Ingleteadora Inalámbrica 8 1/4 210MM 20V SUPER TOTAL", precio: 105034, imagen: img8, descripcion: 
    "Inalámbrica, voltaje de 20V, para máxima portabilidad. Velocidad sin carga de 3000/min, para trabajos rápidos. Disco de tamaño 210mm (8-1/4'') para cortes precisos. Amplia capacidad de corte en diversos ángulos. Mango ergonómico en forma de gatillo incrementa confort. Incluye: batería, cargador, llave hexagonal, bolsa para polvo, abrazadera vertical." },
  { id: 9, nombre: "Lijadora Roto Orbital Inalámbrica 20V TOTAL", precio: 41168, imagen: img9, descripcion: 
    "Ideal para acabados finos en carpintería. Movimiento rotatorio y orbital para lijados eficientes. Voltaje de 20V para alto rendimiento. Velocidad sin carga de 10000RPM. Base de tamaño 125mm para amplia cobertura. Incluye 5 piezas de lija para trabajos diversos." },
  { id: 10, nombre: "Matraca Inalámbrica 3/8 10MM 20V SUPER TOTAL", precio: 37087, imagen: img10, descripcion: 
    "Potente y versátil para atornillar y desatornillar. Útil en madera, metal y plástico. Opera a una potencia de 6.5nm y 20v. Incluye tres dados de 13, 17 y 19mm. Diseño inalámbrico ofrece mayor libertad de movimiento. Garantía de 12 meses. (No incluye batería y cargador)." },
  { id: 11, nombre: "Motosierra Inalámbrica 12 20V TOTAL", precio: 94950, imagen: img11, descripcion: 
    "Motor Brushless de alta potencia (900W). Velocidad variable de la cadena (3700-4500rpm). Espada resistente de 12''. Voltaje óptimo de 20V. Ideal para trabajos industriales pesados. No incluye batería ni cargador." },
  { id: 12, nombre: "Pistola Pintar Inalámbrica 800ML 0.1 - 0.2 bar 20V TOTAL", precio: 24361, imagen: img12, descripcion: 
    "Capacidad de 800ml para grandes proyectos de pintura. Potente presión de pulverización de 0.1-0.2bar. Inalámbrica para una fácil maniobrabilidad. Incluye 4 accesorios para un trabajo personalizado. Ideal para uso doméstico y bricolaje. Garantía de 12 meses para total confianza." },
  { id: 13, nombre: "Podadora Inalámbrica 5'' 125MM 20V + batería 2ah + cargador SUPER TOTAL", precio: 44529, imagen: img13, descripcion: 
    "Sierra podadora de 5 pulgadas versátil y potente. Incluye batería 2Ah y cargador. Ideal para poda y carpintería. 3 accesorios adicionales para adaptabilidad. Garantía de 12 meses incluida. Libertad de movimiento para zonas de difícil acceso." },
  { id: 14, nombre: "Pulidora Inalámbrica 125MM 20V TOTAL", precio: 96630, imagen: img14, descripcion: 
    "Potente motor sin carbones de 20V. Velocidad variable para control exacto. Disco de pulido de 150mm. Pantalla LCD para monitoreo de velocidad. Compatible con baterías recargables. No incluye batería ni cargador." },
  { id: 15, nombre: "Rotomartillo Inalámbrico 16MM 20V SUPER TOTAL", precio: 36966, imagen: img15, descripcion: 
    "Rotomartillo inalámbrico para mayor libertad de movimiento. Potencia de 1.5J, ideal para concreto y mampostería. Incluye 3 brocas para tareas variadas.Empuñadura antideslizante, confortable en usos prolongados. Luz LED integrada para mayor visibilidad de trabajo. Garantía de 12 meses para seguridad del comprador." },
  { id: 16, nombre: "Rotomartillo Inalámbrico 26MM 20V SUPER TOTAL", precio: 73941, imagen: img16, descripcion: 
    "Potente energía de impacto para perforaciones difíciles. Cambios rápidos de accesorios con sistema SDS Plus. Ideal para concreto, mampostería y piedra. Incluye tres brocas y un cincel . Garantía de 12 meses para su tranquilidad." },
  { id: 17, nombre: "Sierra circular inalámbrica (185MM) 20V SUPER TOTAL", precio: 63857, imagen: img17, descripcion:
      "Motor Brushless para cortes precisos. Velocidad sin carga de 4800rpm. Capacidad de corte versátil y ajustable. Diseño inalámbrico para mayor movilidad. Disco de corte de 185mm para diferentes materiales. Garantía de 12 meses para confianza y seguridad." },
  { id: 18, nombre: "Sierra caladora inalámbrica 20V TOTAL ", precio: 47050, imagen: img18, descripcion:
      "Recomendada para cortar materiales delgados, como metal, madera o aluminio, según la hoja que se emplee. Esta sierra caladora incluye: 1 set 5pzas de hojas sierra caladora. Empaque caja de color. DESCRIPCIÓN Voltaje: 20V. Velocidad sin carga: 2400rpm. Capacidad de corte en madera: 80mm. Capacidad de corte en metal: 8mm. NO incluye: Batería ni cargador. Calidad: Industrial. Garantía: 1 año." },
  { id: 19, nombre: "Soplador aspirador inalámbrico Full 20V SUPER TOTAL", precio: 12597, imagen: img19, descripcion:
      "Potente y eficiente con 20V de tensión. Velocidad sin carga de 18,000 rpm. Alcanza un volumen de aire de 2,7m³/min. Ideal para limpiar áreas de trabajo y exteriores. Diseño compacto, inalámbrico para mayor comodidad. Batería y cargador se venden por separado." },
  { id: 20, nombre: "Vibrador de Concreto Inalámbrico 20V SUPER TOTAL", precio: 42008, imagen: img20, descripcion: 
    "Vibrador de 2300rpm para mezcla homogénea de hormigón. Sonda de 1200mm para trabajos de cimentación y columnas. Potencia de 20v para un funcionamiento eficiente. Diseño inalámbrico para mayor movilidad y comodidad. Velocidad adaptable a diferentes tipos de hormigón. Garantía de 12 meses incluida." },
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
