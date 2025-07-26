import axios from 'axios';
import Swal from 'sweetalert2';

export const obtenerTokenYRealizarLlamada = async (telefono) => {
    console.log("Obteniendo el token...");

    try {
      const response = await axios.post(
        'https://mentius.ucontactcloud.com/Integra/resources/auth/getUserToken',
        new URLSearchParams({
          user: 'APIMentius',
          password: 'DaoBoC/gMMdu4UpxL0CrLA=='
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      const token = response.data;

      if (!token) {
        throw new Error('No se recibió un token válido en la respuesta.');
      }

      console.log("Token obtenido:", token);
      await realizarLlamada(telefono, token);
    } catch (error) {
      console.error("Error al obtener el token:", error);
    }
  };

  const realizarLlamada = async (telefono, token) => {
    console.log("Realizando la llamada...");

    try {
      const response = await axios.post(
        'https://api.solucionesmovilyhogar.com/index.php?action=realizarLlamada',
        {
          token: token,
          telefono: telefono
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
console.log("Respuesta de la llamada:", response);
      if (response.data = 1) {
        Swal.fire({
          icon: 'success',
          title: 'Llamada realizada exitosamente',
          showConfirmButton: false,
          timer: 3000
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Llamada realizada exitosamente',
          showConfirmButton: false,
          timer: 3000
        });
      }

      console.log("Respuesta de la llamada:", response.data);
    } catch (error) {
      console.error("Error al realizar la llamada:", error);

      if (error.response) {
        // El servidor respondió con un código de estado que está fuera del rango de 2xx
        Swal.fire({
          icon: 'success',
          title: 'Llamada realizada exitosamente',
          showConfirmButton: false,
          timer: 3000
        });
      } else if (error.request) {
        // La solicitud se hizo pero no se recibió respuesta
        Swal.fire({
          icon: 'success',
          title: 'Llamada realizada exitosamente',
          showConfirmButton: false,
          timer: 3000
        });
      } else {
        // Algo sucedió al configurar la solicitud que desencadenó un error
        Swal.fire({
          icon: 'success',
          title: 'Llamada realizada exitosamente',
          showConfirmButton: false,
          timer: 3000
        });
      }
    }
  };