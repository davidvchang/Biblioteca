import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

function Register() {

  const initialValue = {
    userName: '',
    email: '',
    password: '',
}

const [users, setUsers] = useState(initialValue);
const [message, setMessage] = useState('');
const navigate = useNavigate();

const urlUsers = 'https://biblioteca-0vy8.onrender.com/api/users'

const registerUser = async (e) => {
    e.preventDefault();

    try {
      //Guardar Usuarios en el backend
      const newUser= {
        userName: users.userName,
        email: users.email,
        password: users.password,
      }

      const res = await axios.post(`${urlUsers}`, newUser);
      console.log(res)
      setMessage('Usuario creado correctamente');
      setUsers({...initialValue}) //Limpia el formulario trayendo los valores iniciales
      navigate('/login');
    } catch (ex) {
      console.log(`${ex}`);
    }
  };

  const captureDataUser = (e) => {
    const {name, value} = e.target
    setUsers({...users, [name]: value})
}

  return (
    <section className='Register'>
      <form className='form' onSubmit={registerUser}>
        <h1>Registrar</h1>

            <div className="form-group">
                <label htmlFor="userName">Nombre de usuario</label>
                <input type="text" id="userName" name="userName" onChange={captureDataUser} value={users.userName} required/>
            </div>

            <div className="form-group">
                <label htmlFor="email">Correo</label>
                <input type="text" id="email" name="email" onChange={captureDataUser} value={users.email} required/>
            </div>

            <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" name="password" onChange={captureDataUser} value={users.password} required/>
            </div>

            <span>¿Tienes una cuenta?, <Link to='/login'>Iniciar Sesión</Link></span>

            <div className="btnButton">
                <button type="submit">Registrarse</button>
            </div>
        </form>
    </section>
  )
}

export default Register
