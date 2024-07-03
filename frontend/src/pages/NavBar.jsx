import React from 'react'
import BtnDark from '../components/BtnDark'
import { Link } from 'react-router-dom'

function NavBar() {

  const favorites = 0

  return (
    <section className='Nav'>
      <div className='containerTitleButton'>
        <span className='title'>Biblioteca</span>
        
        <BtnDark text='Iniciar Sesión' to='/login'/>
       
      </div>

      <div className='searchAddBook'>
        <div className='searchInput'>
          <input type="search" placeholder='Buscar por titulo'/>
          <select id="Género">
            <option value="">Seleccionar Género</option>
            <option value="Comedia">Comedia</option>
          </select>
        </div>

        <BtnDark icon={iconFavorite} text={`Favoritos (${favorites})`}/>

        <div className='containerAddBook'>
          <Link to='/' className='booksList'>Ver Libros</Link>
          <BtnDark text='Agregar Libro' to='/add-book'/>

        </div>
      </div>

    </section>
  )
}

const iconFavorite = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6  iconFavorite">
<path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>

export default NavBar
