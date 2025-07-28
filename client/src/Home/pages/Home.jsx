import React, {useState} from 'react'
import { Header } from '../../layout/Header';
import  Footer  from '../../layout/Footer';
import { CardHome } from '../components/CardHome';
import '../components/HomeStyles.css'
import { cardData } from '../components/dataHome.js';
import { ModalTeLlamamos } from '../../utils/ModalTeLlamamos.jsx';
import { CompraExperto } from '../../utils/CompraExperto.jsx';
import BannerAnimation from '../../utils/BannerAnimation.jsx';

export const Home = () => {
  const [isOpenTeLlamamos, setIsOpenTeLlamamos] = useState(false);

  const toggleModalTeLlamamos = () => {
    setIsOpenTeLlamamos(!isOpenTeLlamamos);
  };

  return (
    <div className='home'>
    <CompraExperto/>
    <Header pathLocation={'planes'}/>
    <ModalTeLlamamos
    isOpenTeLlamamos={isOpenTeLlamamos} toggleModalTeLlamamos={toggleModalTeLlamamos}
    />
    {/* <BannerAnimation text={'¡Subimos la velocidad, no el precio! ¡Activa tu plan pospago con 60 Gigas hoy mismo!'}/> */}
      <h2 className='title-h2'>Planes Pospago</h2>
      <div className='home-cards'>
      {
        cardData.map((data, index) => {
          return <CardHome key={index} 
          data={data} 
          setIsOpenTeLlamamos={setIsOpenTeLlamamos} 
          toggleModalTeLlamamos={toggleModalTeLlamamos}
          />
        })
      }
      </div>
      <Footer/>
    </div>
  )
}

export default Home;