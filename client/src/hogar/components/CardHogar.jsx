import React from "react";
import logoIcon from '../../../public/img/logoperpelx-18-25.png';

export const CardHogar = ({ datos, toggleModalTeLlamamos }) => {

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/573241532383', '_blank', 'noopener,noreferrer');
  };


  return (
    <div className="hogar-card">
      {datos.recomendado === "Recomendado" &&
        <div className="hogar-card-recomendado">
          <h4>{datos.recomendado}</h4>
        </div>
      }

      <div className={`hogar-card-megas`} style={datos.recomendado === "" ? { borderRadius: "12px 12px 0px 0px" } : {}}>
        <h3>{datos.title1}</h3>
        <h2>{datos.valor}</h2>
        <h3>{datos.title2}</h3>
      </div>

      <div className="hogar-card-descuento">
        <h3>{datos.descuento}</h3>
      </div>
      <div className="hogar-card-precio">
        <h3>{datos.title3}</h3>
        <h2>{datos.precio}</h2>
        <h4>{datos.title4}</h4>
      </div>
      <div className="hogar-card-button">
        <button
          className="button-interesa"
          onClick={handleWhatsAppClick} >Solicitalo Aqui!</button>
        <button
          className="button-llamamos"
          onClick={toggleModalTeLlamamos}>Te llamamos</button>
      </div>
     {/*  <img
        src={logoIcon}
        alt="Logo"
        style={{ display: 'block', margin: '0 auto', width: '200px' }}
      /> */}


      <div className="hogar-card-img">
        {datos.imgService.map((img, index) => (
          <div key={index} className="hogar-card-img-container">
            <img src={`/img/cards/${img.img}`} alt={img.title} loading="lazy" />
            <p>{
              img.title
            }</p>
          </div>

        ))}
      </div>

    </div>
  );
};
