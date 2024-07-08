import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { useAuth } from '../context/AuthContext';
import axiosInstance from "../api/axios";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [message, setMessage] = useState('')
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/users/login', { email, password });
      // const res = await axiosInstance.post('/users/login', { email, password });
      // const token = res.data.token;
      const token = res.data.token;
      const userEmail = res.data.email
      localStorage.setItem('token', token);
      login({email: userEmail}); // Pasar la información del usuario al contexto
      navigate('/');
    } catch (ex) {
      // setMessage(ex.response.data.message)
      console.log(ex)
    }
  };

  return (
    <section className='Login'> 
      <form className='form' onSubmit={handleLogin}>
        <h1>Iniciar Sesion</h1>
            <div className="form-group">
                <label htmlFor="email">Correo</label>
                <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>

            <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </div>

            <span>¿No tienes una cuenta?, <Link to='/register'>Registrate</Link></span>

            <div className="btnButton">
                <button type="submit">Iniciar Sesion</button>
            </div>

            {message && (
              <div className='messagesLogin'>
                <span className='ErrorMessage'>{message}</span>
              </div>
            )}
        </form>
    </section>
  )
}

export default Login
