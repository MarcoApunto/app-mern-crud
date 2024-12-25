// Autor: Andrés 
// Fecha: 17/12/2024
// Descripción: Front-page con log-in
// Versión de la app 1.0.0

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { user: username, password };

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login Successful:', data);
        alert(`Bienvenido, ${data.message}`);

        // Guardar datos de la sesión en localStorage
        localStorage.setItem('session', JSON.stringify({ username: data.message, role: data.role }));

        // Redirigir según el rol
        if (data.role === 'mecanico') {
          navigate('/mecanico');
        } else if (data.role === 'encargado') {
          navigate('/encargado');
        } else {
          setErrorMessage('Rol no reconocido.');
        }
      } else if (response.status === 401) {
        setErrorMessage('Usuario o contraseña incorrectos');
      } else {
        setErrorMessage('Error al intentar iniciar sesión. Intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Error al conectar con el servidor.');
    }
  };

  return (
    <div className='App'>
      <Header />
      <main>
        <form className="login-form" onSubmit={handleSubmit}>
          <h3>Login Form</h3>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div>
            <label>Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default LoginForm;
