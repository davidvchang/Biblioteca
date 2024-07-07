import React, { useEffect, useState } from 'react'
import BookCard from '../components/BookCard'
import axios from "axios";
import { useLocation } from 'react-router-dom';

function Books() {

  const [books, setBooks] = useState([])
  const location = useLocation();


  useEffect(() => {
    const CallAPI = async () => {
      try {
        // const res = await fetch("http://localhost:4000/api/books")
        // const data = await res.json()
        // setBooks(data)
        
        const params = new URLSearchParams(location.search);
        const search = params.get('search') || '';
        const genre = params.get('genre') || '';
        const res = await axios.get(`http://localhost:4000/api/books?search=${search}&genre=${genre}`);
        setBooks(res.data);
        
      } catch (ex) {
        console.error('Error fetching books:', ex);
      }
    };

    CallAPI()
  }, [location.search]);


  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/books/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setBooks(books.filter(book => book._id !== id)); // Actualiza el estado después de eliminar
      
    } catch (ex) {
      console.error('Error deleting book:', ex);
    }
  }
  

  return (
    <div className='Books'>
      {books.map((dataBook) => (
        <BookCard key={dataBook._id} 
          title={dataBook.title} 
          author={dataBook.author} 
          summary={dataBook.summary} 
          year={dataBook.year} 
          genre={dataBook.genre} 
          clickDelete={() => deleteBook(dataBook._id)} 
          clickUpdate={'/update-book/' + dataBook._id}
        />
      ))}
      
    </div>
  )
}

export default Books
