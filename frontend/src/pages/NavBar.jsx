import React, { useEffect, useState } from 'react'
import BtnDark from '../components/BtnDark'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";

function NavBar() {
  
  const [genresArray, setGenresArray] = useState([])
  const [selectedGenre, setSelectedGenre] = useState('')
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();


  const favorites = 0

  const getGenres = async () => {
    const response = await axios.get('http://localhost:4000/api/books');
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
  }, [])

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
  

  return (
    <section className='Nav'>
      <div className='containerTitleButton'>
        <span className='title'>Biblioteca</span>
        
        <BtnDark text='Iniciar Sesión' to='/login'/>
       
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
