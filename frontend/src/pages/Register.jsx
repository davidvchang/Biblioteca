import React from 'react'
import { Link } from 'react-router-dom'

function Register() {
  return (
    <section className='Register'>
      <form className='form'>
        <h1>Registrar</h1>

            <div className="form-group">
                <label htmlFor="userName">Nombre de usuario</label>
                <input type="text" id="userName" name="userName" required/>
            </div>

            <div className="form-group">
                <label htmlFor="email">Correo</label>
                <input type="text" id="email" name="email" required/>
            </div>

            <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" name="password" required/>
            </div>

            <span>¿Tienes una cuenta?, <Link to='/login'>Iniciar Sesión</Link></span>

            <div className="btnButton">
                <button type="submit">Iniciar Sesion</button>
            </div>
        </form>
    </section>
  )
}

export default Register
