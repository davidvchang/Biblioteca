import React, { useEffect, useState } from 'react'
import BtnDark from '../components/BtnDark'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { useAuth } from '../context/AuthContext';

function NavBar() {
  
  const [genresArray, setGenresArray] = useState([])
  const [selectedGenre, setSelectedGenre] = useState('')
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const favorites = 0

  //ABRIR MENU DESPLEGABLE
  const [menuMovil, setMenuMovil] = useState(false)

  const urlBooks = 'https://biblioteca-0vy8.onrender.com/api/books'
  const urlLogout = 'https://biblioteca-0vy8.onrender.com/api/users/logout'

  const getGenres = async () => {
    const response = await axios.get(`${urlBooks}`);
    const data = response.data;

    // Verificar si hay datos y si es un array con al menos un elemento
    if (data && Array.isArray(data) && data.length > 0) {
      const genreSet = new Set(); // Utilizar un Set para almacenar géneros únicos

      // Iterar sobre los libros y agregar cada género al Set
      data.forEach(book => {
        if (book.genre) {
          genreSet.add(book.genre);
        }
      });

      const genres = [...genreSet];
      setGenresArray(genres)
    } else {
      console.log('No se encontraron libros');
    }
  }

  useEffect(() => {
    getGenres()
  }, [genresArray])

  const handleGenreChange = (e) => {
    const selectedGenre = e.target.value;
    setSelectedGenre(selectedGenre)

    if(selectedGenre === "") {
      navigate('/');
    } else {
      navigate(`/?genre=${selectedGenre}`);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${searchTerm}`);
    setSearchTerm('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
      if(searchTerm === "") {
        navigate('/');
      }
    }
  };

  const logoutSesion = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${urlLogout}`);
      const token = res.data.token;
      localStorage.setItem('token', token);
      logout();
      navigate('/');
      setMenuMovil(false)
    } catch (err) {
      console.error('Error en el cerrar sesión:', err);
    }
  };
  

  return (
    <section className='Nav'>
      <div className='containerTitleButton'>
        <span className='title'>Biblioteca</span>

        <div className='messageButton'>
          <span className='greeting'>{isAuthenticated ? `Hola, ${user?.email}` : ''}</span>
          {isAuthenticated ? <button onClick={logoutSesion} className='btnLogout'><span>Cerrar Sesión</span></button> : <BtnDark text='Iniciar Sesión' to='/login'/>}
        </div>

        {/* BOTONNAVEGACIÓN MOVIL */}
        <div className='navMovil'>
          <button className='btnOpenMenu' onClick={() => setMenuMovil(true)}>{iconOpenMenu}</button>
        
          {/* MENU ABIERTO */}
          <div className={`${menuMovil ? !isAuthenticated ? 'openedMenu' : 'openedMenuAuthenticated' : 'closedMenu'}`}>
            <div className={`${!menuMovil && 'containerHiddenMenu'}`}>
              <div className='topMenu'>
                <span>{isAuthenticated ? `Hola, ${user?.email}` : ''}</span>
                <button onClick={() => setMenuMovil(false)}>{iconCloseMenu}</button>
              </div>

              <div className='optionsMenu'>
                <Link to='/' className='booksList' onClick={() => setMenuMovil(false)}>Ver Libros</Link>
                {isAuthenticated && (
                  <Link to='/add-book' className='addBook' onClick={() => setMenuMovil(false)}>Agregar Libro</Link>

                )}
                {isAuthenticated ? <button onClick={logoutSesion} className='btnLogout'><span>Cerrar Sesión</span></button> : <BtnDark text='Iniciar Sesión' to='/login' onClick={() => setMenuMovil(false)}/>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='searchAddBook'>
        <div className='searchInput'>
          <form onSubmit={handleSearch}>
              <input
                type="search"
                placeholder='Buscar por titulo'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
              />
          </form>

          <select value={selectedGenre} id="Género" onChange={handleGenreChange}>
            <option value="">Seleccionar Género</option>
            {genresArray.map((genres, index) => (
              <option key={index} value={genres}>{genres}</option>
            ))}
          </select>
        </div>

          <div className='containerAddBook'>
            <Link to='/' className='booksList'>Ver Libros</Link>

            {isAuthenticated && (
              <BtnDark text='Agregar Libro' to='/add-book'/>

            )}

          </div>
      </div>

    </section>
  )
}

const iconFavorite = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6  iconFavorite">
<path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>

const iconOpenMenu = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 btnMenuMovil">
<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>

const iconCloseMenu = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 btnMenuMovil">
<path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>



export default NavBar
