import React, { useState } from "react";
import { obtenerTokenYRealizarLlamada } from "../hooks/teLlamamos";

export const ModalTeLlamamos = ({ isOpenTeLlamamos, toggleModalTeLlamamos }) => {
  const [telefono, setTelefono] = useState("");
  const [aceptoTerminos, setAceptoTerminos] = useState(true);
  const [error, setError] = useState("");

  // 📌 Validación del número de teléfono
  const validatePhoneNumber = (number) => {
    const phoneRegex = /^[3][0-9]{9}$/; // Empieza con 3 y tiene 10 dígitos
    return phoneRegex.test(number);
  };

  // 📌 Restringimos la entrada del número
  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 10 && /^[3][0-9]*$/.test(value)) {
      setTelefono(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!validatePhoneNumber(telefono)) {
      setError("Ingrese un número válido (Ej: 350 123 4567)");
      return;
    }

    if (!aceptoTerminos) {
      setError("Debe aceptar la política de tratamiento de datos");
      return;
    }

    await obtenerTokenYRealizarLlamada(telefono);
    toggleModalTeLlamamos(); // Cerrar modal después de enviar
  };

  if (!isOpenTeLlamamos) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={toggleModalTeLlamamos} className="close-button">
          X
        </button>
        <div className="modal-body">
          <h2>¡Te llamamos!</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Ej: 350 123 4567"
              value={telefono}
              onChange={handleChange}
              maxLength="10"
            />
            {error && <p className="error-message">{error}</p>}
            <div>
              <input
                type="checkbox"
                checked={aceptoTerminos}
                onChange={(e) => setAceptoTerminos(e.target.checked)}
              />
              Al hacer click en "Llamame Ahora", usted acepta la{' '}
              <a href="#">Política de Tratamiento de Datos</a>
            </div>
            {!aceptoTerminos && error === "Debe aceptar la política de tratamiento de datos" && (
              <p className="error-message">{error}</p>
            )}
            <button type="submit" className='BtnForm' disabled={!validatePhoneNumber(telefono) || !aceptoTerminos}>
              Llamame Ahora
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
