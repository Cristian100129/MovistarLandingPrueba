import React, { useEffect, useState } from "react";
import { Header } from "../../layout/Header";
import Footer from "../../layout/Footer";
import CardTi from "../components/CardTi";
import { celulares } from "../../utils/celulares";
import "../components/tiStyle.css";
import { CompraExperto } from "../../utils/CompraExperto";
import BannerAnimation from "../../utils/BannerAnimation";

const imgMenu = [
  { nombre: "Honor", img: "honor.png" },
  { nombre: "Iphone", img: "Iphone.png" },
  { nombre: "Samsung", img: "samsung.png" },
  { nombre: "Xiaomi-redmi", img: "Xiaomi-redmi.png" },
  { nombre: "Vivo", img: "vivo.png" },
  { nombre: "Oppo", img: "Oppo.png" },
  { nombre: "Motorola", img: "motorola.png" },

];

export const Tecnologias = () => {
  const [tecnologias, setTecnologias] = useState([]);
  const [marcaSeleccionada, setMarcaSeleccionada] = useState("Todas");

  useEffect(() => {
    const celularesArray = Object.values(celulares).flat();
    setTecnologias(celularesArray);
  }, []);

  // Obtener las marcas disponibles
  const marcas = ["Todas", ...Object.keys(celulares)];

  // Filtrar celulares según la marca seleccionada
  const celularesFiltrados =
    marcaSeleccionada === "Todas"
      ? tecnologias
      : celulares[marcaSeleccionada] || [];


  return (
    <div className="contenedor-tecnologias">
      <Header pathLocation="tegnologias" />
      <BannerAnimation text={'¡Movistar Celulares: Encuentra tus marcas favoritas!'}/>
      <h2 className="title-h2">Tecnologías</h2>

      {/* Menú de selección de imágenes (Solo en Desktop) */}
      <div className="menu-imagenes">
        {imgMenu.map(({ nombre, img }) => (
          <div className={`marca-img
          ${marcaSeleccionada === nombre ? "activa" : ""}
            `}
            key={nombre}
            >
          <img         
            src={`/img/celulares/${img}`}
            alt={nombre}
            loading="lazy" 
            className={`                        
                        ${nombre === "Samsung" ? "samsung" : ""}
                        `}
            onClick={() => setMarcaSeleccionada(nombre)}
          />
          </div>
        ))}
      </div>

      {/* Menú de selección de marca (Solo en Móvil) */}
      <div className="menu-select">
        <label htmlFor="marca">Filtrar por marca:</label>
        <select
          id="marca"
          value={marcaSeleccionada}
          onChange={(e) => setMarcaSeleccionada(e.target.value)}
        >
          {marcas.map((marca) => (
            <option key={marca} value={marca}>
              {marca}
            </option>
          ))}
        </select>
      </div>

      {/* Mostrar los celulares filtrados */}
      <div className="contenedor-celulares">
        {celularesFiltrados.map((celular) => (
          <CardTi key={celular.referencia} celular={celular} />
        ))}
      </div>
      <Footer />
      <CompraExperto />
    </div>
  );
};

export default Tecnologias;
