import React from 'react'
import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

function BookCard({title, author, summary, year, genre, clickDelete, clickUpdate}) {

    const { isAuthenticated } = useAuth();
    
  return (
    <div className='BookCard'>
        <div className='containerTitleAuthorSummary'>
            <span className='title'>{title}</span>
            <span className='author'>{`Por ${author}`}</span>
            <p className='summary'>{summary}</p>
        </div>

        <div className='containerYearGenreIcons'>
            <div className='yearGenre'>
                <span className='year'>{year}</span>    
                <span>-</span>
                <span className='genre'>{genre}</span>
            </div>

            <div className='containerActions'>
                {isAuthenticated && (
                    <>
                        <Link to={clickUpdate} className='btnEdit button'>
                            {iconEdit}
                        </Link>

                        <button className='btnDelete button' onClick={clickDelete}>
                            {iconDelete}
                        </button>

                        <button className='btnFavorite button'>
                            {iconFavorite}
                        </button>
                    </>
                )}
            </div>
        </div>

    </div>
  )
}

const iconEdit = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 iconsActions iconEdit">
<path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>

const iconDelete = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash iconsActions iconDelete">
    <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
</svg>

const iconFavorite = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 iconsActions iconFavorite">
<path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>




export default BookCard
