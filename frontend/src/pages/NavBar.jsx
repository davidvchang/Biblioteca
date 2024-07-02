import React from 'react'
import BtnDark from '../components/BtnDark'

function NavBar() {
  return (
    <section className='Nav'>
      <div className='containerTitleButton'>
        <span className='title'>Biblioteca</span>
        <BtnDark text='Iniciar Sesión'/>
      </div>

      <div className='searchInput'>
        <input type="search" placeholder='Buscar por titulo'/>
        <select id="Género">
          <option value="">Seleccionar Género</option>
          <option value="Comedia">Comedia</option>
        </select>
      </div>
    </section>
  )
}

export default NavBar
