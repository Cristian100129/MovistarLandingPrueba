import React, { useState } from "react";
import { ModalTeLlamamos } from "../../utils/ModalTeLlamamos.jsx";
import { CompraExperto } from "../../utils/CompraExperto.jsx";
import { Header } from "../../layout/Header";
import Footer from "../../layout/FooterHogar";
import { planesInternet } from "../components/MovistarTotalData.js";
import "../components/MovistarStyles.css";
import { CardMovistarTotal } from "../components/CardMovistarTotal.jsx";
import BannerAnimation from "../../utils/BannerAnimation.jsx";

export const MovistarTotal = () => {
  const [isOpenTeLlamamos, setIsOpenTeLlamamos] = useState(false);
  const [filtroNombre, setFiltroNombre] = useState("Internet Fibra + Pospago"); 

  const toggleModalTeLlamamos = () => {
    setIsOpenTeLlamamos(!isOpenTeLlamamos);
  };

  const handleFilterChange = (event) => {
    setFiltroNombre(event.target.value);
  };

  const handleFilterButtonClick = (nombre) => {
    setFiltroNombre(nombre === filtroNombre ? "" : nombre);
  };

  const opcionesFiltro = [
    "Internet Fibra + Pospago",
    "Internet Fibra + Telefonía + Pospago", 
    "Internet Fibra + Telefonía + TV + Pospago"
  ];

  const planesFiltrados = planesInternet.filter((plan) =>
    filtroNombre ? plan.nombre === filtroNombre : true
  );

  return (
    <div className="movistarTotal-container">
      <CompraExperto />
      <Header pathLocation={"movistartotal"} />
      {/* <BannerAnimation text={'¡Subimos la velocidad, no el precio! ¡Activa tu nueva velocidad de 900 Megas hoy mismo!'}/> */}
      <ModalTeLlamamos
        isOpenTeLlamamos={isOpenTeLlamamos}
        toggleModalTeLlamamos={toggleModalTeLlamamos}
      />
      <h2 className="title-h2">Servicios movistarTotal</h2>
      <p className="description-p2">Une tus servicios Movistar Hogar y Pospago ¡Contrata hoy y disfruta de beneficios exclusivos!</p>

      <div className="movistarTotal-filter-container">
        <label className="movistarTotal-filter-label" htmlFor="filtroPlanes">
          Filtrar por tipo de plan:
        </label>
        <select
          id="filtroPlanes"
          className="movistarTotal-filter-select"
          value={filtroNombre}
          onChange={handleFilterChange}
        >
          <option value="">Todos</option>
          {opcionesFiltro.map((opcion, index) => (
            <option key={index} value={opcion}>
              {opcion}
            </option>
          ))}
        </select>
      </div>

      <div className="movistarTotal-filter-container-desktop">
        <h3 className="movistarTotal-filter-title-desktop">Filtrar por tipo de plan</h3>
        <div className="movistarTotal-filter-buttons-desktop">
          {opcionesFiltro.map((opcion, index) => (
            <button
              key={index}
              className={`movistarTotal-filter-button-desktop ${
                filtroNombre === opcion ? "active" : ""
              }`}
              onClick={() => handleFilterButtonClick(opcion)}
            >
              {opcion}
            </button>
          ))}
        </div>
      </div>
      
      <div className="movistarTotal-cards">
        {planesFiltrados.length > 0 ? (
          planesFiltrados.map((plan, index) => (
            <CardMovistarTotal
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

export default MovistarTotal;