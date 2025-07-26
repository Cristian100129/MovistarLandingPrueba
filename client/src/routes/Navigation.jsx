import React, { useState, useEffect, useRef } from 'react';
import { Routes, useNavigate, Route } from "react-router";
import gsap from "gsap";
import { routes } from './routes';
import logoMovistar from "../../public/img/logomovistar.png";
import arrowR from '../assets/img/arrowR.png';
import phone from '../assets/img/phone.png';
import menu_servicio from '../assets/img/menu/menuMovil.png';
import menu_hogar from '../assets/img/menu/menuHogar.png';
import menu_tele from '../assets/img/menu/menuTi.png';
import { ModalTeLlamamos } from '../utils/ModalTeLlamamos';
import pather from '../assets/img/logos/partner-aliado-movistar.png';

const MENU_ICONS = {
    Planes: menu_servicio,
    Hogar: menu_hogar,
    Tecnologias: menu_tele,
};

const MENU_DESCRIPTIONS = {
    MovistarTotal: "Todo en uno",
    Planes: "Planes Pospago y más",
    Hogar: "Internet, Packs",
    Tecnologias: "Celulares y más!",
    default: "Planes Pospago, Paquetes y más",
};

export const Navigation = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const barRefs = [useRef(null), useRef(null), useRef(null)];
    const menuRef = useRef(null);
    const mainRef = useRef(null);
    const menuDesktopRef = useRef(null);
    const [lastScrollY, setLastScrollY] = useState(0);
    const location = window.location.pathname;
    const [isOpenTeLlamamos, setIsOpenTeLlamamos] = useState(false);
    const [showMenuDesktop, setShowMenuDesktop] = useState(true);
    
    const toggleModalTeLlamamos = () => {
    setIsOpenTeLlamamos(!isOpenTeLlamamos);
    };
    

    useEffect(() => {
        const tl = gsap.timeline();
        if (menuOpen) {
            tl.to(barRefs[0].current, { y: 7, rotate: 45, duration: 0.3, background: "#fff" })
              .to(barRefs[1].current, { opacity: 0, duration: 0.2 }, "-=0.3")
              .to(barRefs[2].current, { y: -7, rotate: -45, duration: 0.3, background: "#fff" }, "-=0.3")
              .fromTo(menuRef.current, { x: "100%", opacity: 0, visibility: "hidden" }, { x: "0%", opacity: 1, visibility: "visible", duration: 0.5, ease: "power2.out" })
              .to(mainRef.current, { opacity: 0.5, duration: 0.5 }, "-=0.5");
        } else {
            tl.to(barRefs[0].current, { y: 0, rotate: 0, duration: 0.3, background: "#004C97" })
              .to(barRefs[1].current, { opacity: 1, duration: 0.2 }, "-=0.3")
              .to(barRefs[2].current, { y: 0, rotate: 0, duration: 0.3, background: "#004C97" }, "-=0.3")
              .to(menuRef.current, { x: "100%", opacity: 0, duration: 0.5, ease: "power2.in", onComplete: () => menuRef.current.style.visibility = "hidden" })
              .to(mainRef.current, { opacity: 1, duration: 0.5 }, "-=0.5");
        }
    }, [menuOpen]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY === 0) setShowMenuDesktop(true);
            else setShowMenuDesktop(currentScrollY < lastScrollY);
            setLastScrollY(currentScrollY);
        };
        
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    useEffect(() => {
        gsap.to(menuDesktopRef.current, {
            y: showMenuDesktop ? "0%" : "-100%",
            duration: 0.5,
            ease: "power2.out",
        });
    }, [showMenuDesktop]);

    useEffect(() => {
        if(location === "/") navigate("/planes");
    }, [location]);

    return (
        <main className='main'>
            <nav className='menu-hamburguesa'>
                <div className='barras' onClick={() => setMenuOpen(!menuOpen)}>
                    {barRefs.map((ref, index) => <div key={index} className='barra' ref={ref}></div>)}
                </div>

                <ul ref={menuRef} className='menu'>
                    <li className='header-menu-hamburguesa'>
                        <img src={logoMovistar} alt="Logo Movistar" />
                        <p>movistar</p>
                    </li>
                    {routes.map(({ to, name, path }) => (
                        <li
                            key={to}
                            onClick={() => { navigate(to); setMenuOpen(false); }}
                            className={window.location.pathname === path ? "active menuli" : "menuli"}
                        >
                            <div className="menu-imges">
                                <img src={MENU_ICONS[name] || phone} className={!MENU_ICONS[name] ? "phone" : ""} />
                                {name}
                                <span>{MENU_DESCRIPTIONS[name] || MENU_DESCRIPTIONS.default}</span>
                            </div>
                            <img src={arrowR} className="arrowR" />
                        </li>
                    ))}                 
                    <li className="menuli" onClick={toggleModalTeLlamamos}>
                        <div className="menu-imges">
                            <img src={phone} className="phone" />
                            Te llamamos
                        </div>
                    </li>
                       
                </ul>
            </nav>
             {/* Menú Desktop con animación de barrido */}
             <nav ref={menuDesktopRef} className='menu-desktop'>
             <div className='menu-desktop-content'>
                 <img src={pather} alt="Logo Movistar" />
                 <p>movistar</p>
                 <ul>
                     {routes.map(({ to, name, path }) => (
                         <li key={to} onClick={() => navigate(to)} className={window.location.pathname === path ? "active-desktop" : ""}>
                             {name}
                         </li>
                     ))}
                 </ul>
             </div>
              {/* <div className='menu-desktop-content' onClick={toggleModalTeLlamamos}>
                 <img src={phone} alt="phone" />
                 <p>Te llamamos</p>
             </div>  */}
             <div className="menulinea">
                <a 
                href='tel:6019142071' className='phone'>
                    Linea de ventas 6019142071
                </a>             
            </div>
         </nav>

         {/* Contenido principal */}
         <div ref={mainRef} className="content">
             <Routes>
                 {routes.map(({ path, Component }, index) => (
                     <Route key={index} path={path} element={<Component />} />
                 ))}
             </Routes>
         </div>

         <ModalTeLlamamos isOpenTeLlamamos={isOpenTeLlamamos} toggleModalTeLlamamos={toggleModalTeLlamamos} />
     </main>
    );
};