import React, { useState } from "react";
import { ModalTeLlamamos } from "../../utils/ModalTeLlamamos";

const CardTi = ({ celular }) => {
  const [isOpenTeLlamamos, setIsOpenTeLlamamos] = useState(false);

  const toggleModalTeLlamamos = () => {
    setIsOpenTeLlamamos(!isOpenTeLlamamos);
  };

  const imagePath =
    celular.marca === "XBOX"
      ? `/img/celulares/tecnologia/${celular.name_img}`
      : `/img/celulares/${celular.marca}/${celular.name_img}`;

  return (
    <>
      <div className="card-tegnologia" onClick={toggleModalTeLlamamos}>
        <img src={imagePath} alt={`Imagen de ${celular.referencia}`} />
        <div>
          <p>{celular.marca}</p>
          <h3>{celular.referencia}</h3>
          <h4>{celular.Gb}</h4>
          <div className="precio">{celular.Price}</div>
        </div>
      </div>
      <ModalTeLlamamos
        isOpenTeLlamamos={isOpenTeLlamamos}
        toggleModalTeLlamamos={toggleModalTeLlamamos}
      />
    </>
  );
};

export default CardTi;
