import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ModalTeLlamamos } from "./ModalTeLlamamos";

export const CompraExperto = () => {
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);
  const [visible, setVisible] = useState(false); // Empieza oculto
  const [isFirstLoad, setIsFirstLoad] = useState(true); // Para controlar la primera carga
  const containerRef = useRef(null);
  const [isOpenTeLlamamos, setIsOpenTeLlamamos] = useState(false);

  const toggleModalTeLlamamos = () => {
    setIsOpenTeLlamamos(!isOpenTeLlamamos);
  };

  useEffect(() => {
    // Ocultar el componente solo en la primera carga
    if (isFirstLoad) {
      gsap.set(containerRef.current, { opacity: 0, y: 100 });
      setTimeout(() => setIsFirstLoad(false), 100); // Desactivar flag después de la carga
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY === 0) {
        // Si el usuario está en la parte superior, ocultar el componente
        if (visible) {
          setVisible(false);
          gsap.to(containerRef.current, {
            y: 100,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
          });
        }
      } else if (currentScrollY < lastScrollY) {
        // Scroll hacia arriba -> Mostrar
        if (!visible) {
          setVisible(true);
          gsap.to(containerRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          });
        }
      } else {
        // Scroll hacia abajo -> Ocultar
        if (visible) {
          setVisible(false);
          gsap.to(containerRef.current, {
            y: 100,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
          });
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, visible, isFirstLoad]);

  return (
    <>
      <ModalTeLlamamos
        isOpenTeLlamamos={isOpenTeLlamamos}
        toggleModalTeLlamamos={toggleModalTeLlamamos}
      />
      <div ref={containerRef} className="compra-experto">
        <p>Compra con un experto</p>
        <a href="tel:6019142071" type="button" className="call-button">
          Llamanos
        </a>

        <button onClick={toggleModalTeLlamamos}>Te llamamos</button>
        <p className="politica-texto-p">
          Al hacer clic autorizo el tratamiento de mis datos personales de
          acuerdo a la &nbsp;
          <a
            href="../../public/img/politicadDatos.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            política de Movistar Colombia
          </a>
          .
        </p>
      </div>
    </>
  );
};
