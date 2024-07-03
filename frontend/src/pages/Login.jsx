import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <section className='Login'>
      <form className='form'>
        <h1>Iniciar Sesion</h1>
            <div className="form-group">
                <label htmlFor="email">Correo</label>
                <input type="text" id="email" name="email" required/>
            </div>

            <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" name="password" required/>
            </div>

            <span>¿No tienes una cuenta?, <Link to='/register'>Registrate</Link></span>

            <div className="btnButton">
                <button type="submit">Iniciar Sesion</button>
            </div>
        </form>
    </section>
  )
}

export default Login
