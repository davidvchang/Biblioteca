import React from 'react'
import { Link } from 'react-router-dom'

function BtnDark({text, to, icon}) {
  return (
    <Link to={to} className='btnDark'>
        <span>{icon} {text}</span>
    </Link>
  )
}

export default BtnDark
