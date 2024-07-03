import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function AddBook() {

    const initialValue = {
        title: '',
        author: '',
        summary: '',
        year: new Date().getFullYear(),
        genre: ''
    }

    let {id} = useParams() //Obtiene el id de la url

    const [dataBooks, setDataBooks] = useState(initialValue);
    const [message, setMessage] = useState('')
    // const [subId, setSubId] = useState(id)
    const navigate = useNavigate()

    //Hacer una pedicion a la API
    useEffect(() => {
        if(id) {
        getOne(id)
        }
    }, [id])

    const saveBook = async (e) => {
        e.preventDefault(); //Se usa para que no recargue la página al enviar

        try {
            //Guardar datos en el backend
            const newBook = {
                title: dataBooks.title,
                author: dataBooks.author,
                summary: dataBooks.summary,
                year: dataBooks.year,
                genre: dataBooks.genre
            }

            if (id) {
                await axios.put(`http://localhost:4000/api/books/${id}`, newBook);
                setMessage('Libro actualizado correctamente');
            } else {
                await axios.post('http://localhost:4000/api/books', newBook);
                setMessage('Libro guardado correctamente');
            }

            setDataBooks({...initialValue}) //Limpia el formulario trayendo los valores iniciales
            navigate('/');
        } catch (ex) {
            setMessage('Ha ocurrido un error al guardar')
        }
    }
    
    const getOne = async (valueId) => {
        try {
            const res = await axios.get(`http://localhost:4000/api/books/${valueId}`)
            setDataBooks({
                title: res.data.title,
                author: res.data.author,
                summary: res.data.summary,
                year: res.data.year,
                genre: res.data.genre
            })
            
        } catch (ex) {
            console.error('Error fetching book:', ex);
            setMessage('Error al obtener el libro');
        }
      }

    const captureDataBook = (e) => {
        const {name, value} = e.target
        setDataBooks({...dataBooks, [name]: value})
    }

      
      

    // //ACTUALIZAR LIBROS
    // const updateBook = async (e) => {
    //     e.preventDefault();
    //     const newBook = {
    //         title: dataBooks.title,
    //         author: dataBooks.author,
    //         summary: dataBooks.summary,
    //         year: dataBooks.year,
    //         genre: dataBooks.genre
    //     }

    //     await axios.put('http://localhost:4000/api/books/' + subId, newBook)
    //     setDataBooks({...initialValue})
    //     setSubId('')
    // }



  return (
    <section className='AddBook'>
      <form className='form' onSubmit={saveBook}>
        <h1>{id ? 'Actualizar Libro' : 'Agregar Libro'}</h1>
            <div className="form-group">
                <label htmlFor="title">Título</label>
                <input type="text" id="title" name="title" onChange={captureDataBook} value={dataBooks.title} required/>
            </div>

            <div className="form-group">
                <label htmlFor="author">Autor</label>
                <input type="text" id="author" name="author"  onChange={captureDataBook} value={dataBooks.author} required/>
            </div>

            <div className="form-group">
                <label htmlFor="summary">Resumen</label>
                <textarea id="summary" name="summary" rows="4"  onChange={captureDataBook} value={dataBooks.summary} required></textarea>
            </div>

            <div className="form-group">
                <label htmlFor="year">Año de Lanzamiento</label>
                <input type="number" id="year" name="year" min="0" max="9999"  onChange={captureDataBook} value={dataBooks.year} required/>
            </div>

            <div className="form-group">
                <label htmlFor="genre">Género</label>
                <input type="text" id="genre" name='genre'  onChange={captureDataBook} value={dataBooks.genre} required/>
            </div>

            <div className="btnButton">
                <button type="submit">Agregar Libro</button>
            </div>

            {message && (
            <div className='messagesAddBook'>
                {message === "Cliente guardado correctamente" ? (
                <span className='saveCorrectMessage'>{message}</span>
                ) : (
                <span className='saveErrorMessage'>{message}</span>
                )}

            </div>
        )}
        </form>

        {/* <form onSubmit={updateBook}>
            <button className='btnUpdate'>Update Client</button>
      </form> */}
    </section>
  )
}

export default AddBook
