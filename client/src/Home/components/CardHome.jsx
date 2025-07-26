import React from 'react';
import logoIcon from '../../../public/img/logoperpelx-18-25.png';

export const CardHome = ({ data, toggleModalTeLlamamos }) => {

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/573241532420', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="card-home">
      {data.recomendado === "Recomendado" && (
        <div className="card-recomendado">
          <h3>{data.recomendado}</h3>
        </div>
      )}
      {data.promo?.titlePromo && (
        <div className="card-home-netflix">
          <img src={data.promo.imagenPromo} alt={data.promo.titlePromo} />
        </div>
      )}
      <div className="card-home-header">
        <h3>{data.title}</h3>
        <p>{data.subTitle}</p>
      </div>
      <div className="card-home-descuento">{data.descuento}</div>
      <div className="card-home-price">
        <h3>{data.price}</h3>
        <p>{data.antes}</p>
      </div>

      <div className="hogar-card-button">
        <button
          className="button-interesa"
          onClick={handleWhatsAppClick} >Solicitalo Aqui!</button>
        <button
          className="button-llamamos"
          onClick={toggleModalTeLlamamos}>Te llamamos</button>
      </div>

      <img
        src={logoIcon}
        alt="Logo"
        style={{ display: 'block', margin: '0 auto', width: '200px', }}
      />

      {data.apps?.length > 0 && <div className="card-home-icons">
        <p>Apps que incluye tu plan</p>
        <div>
          {data.apps.map((app, index) => (
            <img key={index} src={app} alt="app" style={app.includes("netflixicon") ? { width: "100px" } : {}} />
          ))}
        </div>
      </div>}
      <div className="card-home-mas">
        {data.otros?.map((item, index) => (
          <div key={index} className="mas">
            <img src={item.icon} alt="icon" style={{ marginTop: "-10px" }} />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardHome;
