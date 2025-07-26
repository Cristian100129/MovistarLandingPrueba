import React, { useState } from "react";
import { ModalTeLlamamos } from "../../utils/ModalTeLlamamos.jsx";
import { CompraExperto } from "../../utils/CompraExperto.jsx";
import { Header } from "../../layout/Header";
import Footer from "../../layout/FooterHogar";
import { planesInternet } from "../components/hogarData.js";
import "../components/hogarStyles.css";
import { CardHogar } from "../components/CardHogar.jsx";
import BannerAnimation from "../../utils/BannerAnimation.jsx";

export const Hogar = () => {
  const [isOpenTeLlamamos, setIsOpenTeLlamamos] = useState(false);
  const [filtroNombre, setFiltroNombre] = useState("Internet"); 
  const subMenuTitle = {
    internet: { title: "Fibra" },
    trio: { title: "Fribra + telefonía + TV" },
  };

  const toggleModalTeLlamamos = () => {
    setIsOpenTeLlamamos(!isOpenTeLlamamos);
  };

  // ✅ Manejar cambio en el filtro del <select>
  const handleFilterChange = (event) => {
    setFiltroNombre(event.target.value);
  };

  // ✅ Manejar el filtro cuando se hace clic en los botones
  const handleFilterButtonClick = (nombre) => {
    setFiltroNombre(nombre === filtroNombre ? "" : nombre);
  };

  // 🔹 Extraer dinámicamente los nombres únicos de los planes
  const nombresUnicos = [...new Set(planesInternet.map((plan) => plan.nombre))];

  // 🔹 Filtrar planes según el nombre seleccionado
  const planesFiltrados = planesInternet.filter((plan) =>
    filtroNombre ? plan.nombre === filtroNombre : true
  );


  const normalizeString = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  
  


  return (
    <div className="hogar-container">
      <CompraExperto />
      <Header pathLocation={"hogar"} />
      <BannerAnimation text={'¡Subimos la velocidad, no el precio! ¡Activa tu nueva velocidad de 900 Megas hoy mismo!'}/>
      <ModalTeLlamamos
        isOpenTeLlamamos={isOpenTeLlamamos}
        toggleModalTeLlamamos={toggleModalTeLlamamos}
      />
      <h2 className="title-h2">Servicios Hogar</h2>

      {/* 🔹 FILTRO POR SELECT */}
      <div className="hogar-filter-container">
        <label className="hogar-filter-label" htmlFor="filtroPlanes">
          Filtrar por tipo de plan:
        </label>
        <select
          id="filtroPlanes"
          className="hogar-filter-select"
          value={filtroNombre}
          onChange={handleFilterChange}
        >
          <option value="">Todos</option>
          {nombresUnicos.map((nombre, index) => (
            <option key={index} value={nombre}>
              {nombre}  {nombre === 'Internet' && <i>- Fibra</i>}             
            </option>
          ))}
        </select>
      </div>

      {/* 🔹 FILTRO POR BOTONES (Versión Desktop) */}
      <div className="hogar-filter-container-desktop">
        <h3 className="hogar-filter-title-desktop">Filtrar por tipo de plan</h3>
        <div className="hogar-filter-buttons-desktop">
          {nombresUnicos.map((nombre, index) => (
            <button
              key={index}
              className={`hogar-filter-button-desktop ${
                filtroNombre === nombre ? "active" : ""
              }`}
              onClick={() => handleFilterButtonClick(nombre)}
            >
              {nombre}
             {
                subMenuTitle[normalizeString(nombre)] && <b 
                style={{fontSize: '0.8rem', display: 'block', color: '#ccc'}}
                >{subMenuTitle[normalizeString(nombre)].title}</b>
              }
            </button>
          ))}
        </div>
      </div>

      {/* 🔹 MOSTRAR PLANES FILTRADOS */}
      <div className="hogar-cards">
        {planesFiltrados.length > 0 ? (
          planesFiltrados.map((plan, index) => (
            <CardHogar
              key={index}
              datos={plan}
              toggleModalTeLlamamos={toggleModalTeLlamamos}
            />
          ))
        ) : (
          <p>No hay planes disponibles para el filtro seleccionado.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Hogar;
