import React from 'react'
import './layouts.css'
import { FormularioGeneral } from './FormularioGeneral'
import { FormularioGeneralHogar } from './FormularioGeneralHogar'
import { FormularioGeneralTecno } from './FormularioGeneralTecno'
import { FormularioGeneralMovistarTotal } from './FormularioGeneralMovistarTotal'



export const Header = ({ pathLocation }) => {
  return (
    <header className={`header ${pathLocation}`}>
      {pathLocation === 'planes' && <FormularioGeneral />}
      {pathLocation === 'hogar' && <FormularioGeneralHogar tipo="hogar" />}
      {pathLocation === 'tegnologias' && <FormularioGeneralTecno tipo="tecnologia" />}
      {pathLocation === 'movistartotal' && <FormularioGeneralMovistarTotal tipo="movistartotal"/>}

    </header>
  )
}
