import React, { useState } from 'react';
import { obtenerTokenYRealizarLlamada } from '../hooks/teLlamamos';

export const FormularioGeneral = () => {
  const [telefono, setTelefono] = useState('');
  const [aceptoTerminos, setAceptoTerminos] = useState(true);
  const [error, setError] = useState('');

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
    setError('');

    if (!validatePhoneNumber(telefono)) {
      setError('Ingrese un número válido (Ej: 350 123 4567)');
      return;
    }

    if (!aceptoTerminos) {
      setError('Debe aceptar la política de tratamiento de datos');
      return;
    }

    await obtenerTokenYRealizarLlamada(telefono);
  };

  return (
    <div className='header-container'>
      <div className='form-izquierda header-form'>
        <p className='title-header-form'>¡Oferta por tiempo limitado!</p>
        <p className='title-header-form-h3'>¡Déjanos tus datos para garantizar la promoción!</p>
        <form onSubmit={handleSubmit}>
          <input
            type='number'
            placeholder='Ej: 350 123 4567'
            value={telefono}
            onChange={handleChange}
            maxLength="10"
            style={{
              width: '100%',      // Hace que ocupe todo el ancho del contenedor
              maxWidth: '500px',  // Máximo ancho opcional
              padding: '10px',    // Espaciado interno
              fontSize: '16px',   // Tamaño de letra legible
              border: '1px solid #ccc', // Borde suave
              borderRadius: '5px',      // Bordes redondeados
              boxSizing: 'border-box'   // Evita desbordamientos por padding
            }}
          />
          {error && <p className='error-message'>{error}</p>}
          <span>
            <input
              type='checkbox'
              checked={aceptoTerminos}
              onChange={(e) => setAceptoTerminos(e.target.checked)}
            />
            Al hacer click en "Llamame Ahora", usted acepta la{' '}
            <a href='#'>Política de Tratamiento de Datos</a>
          </span>
          {!aceptoTerminos && error === "Debe aceptar la política de tratamiento de datos" && (
            <p className="error-message">{error}</p>
          )}
          <button type='submit' className='BtnForm' disabled={!validatePhoneNumber(telefono) || !aceptoTerminos}>
            Llamame Ahora
          </button>
        </form>
      </div>
{/* 
      <div className='form-derecha'>
        <p className='jv'>¡Haz portabilidad a Movistar y navega a toda velocidad!</p>
        <p>Activa tu Plan ilimitado con <strong>50%</strong> Dto 2 <strong>meses</strong></p>
        <p>60 GB por solo <strong>$ 22.995</strong> luego <strong>$ 45.990</strong></p>

      </div> */}
    </div>
  );
};
