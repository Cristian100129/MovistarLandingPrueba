import React from 'react';
import logomovistar from '../assets/img/logomovistar.png';
import movistarFooter from '../assets/img/logos/patherMentius.png';
import { Link } from 'react-router';
import callPhone from '../assets/img/logos/call.png';


export default function Footer() {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/573241532420 ', '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className='footer'>
     
      <p>
      <img src={logomovistar} alt='logomovistar' className='logoFooterM'/>
        <a className='politicaPrivacidad' href='../../public/img/politicadDatos.pdf' target="_blank">Política de privacidad</a>
      </p>

  
     <Link to='/planes' className='goToPlanes'>
      <img src={movistarFooter} 
      alt='logomovistarA' 
      className='logoPatherMF'
      />     
     </Link>
     
     <a 
      href='tel: 6019142071' className='phone-footer'>
      <div className='call-icon'>
        <img src={callPhone} alt='callPhone' className='callPhone' />
      </div>
   
        <span className='phoneNumber'>
        Linea de ventas
        6019142071</span>
     </a>
        

      <img 
        src='/img/LogoWhatsApp.webp'
        alt='whatsApp' 
        className='whatsApp heart' 
        onClick={handleWhatsAppClick} 
        style={{ cursor: 'pointer' }} 
      />     

    </footer>
  );
}