import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAut } from '../context/ContextProvider';

const Login = () => {
  const [formData, setFormData] = useState({ correo: '', password: '' });
  const [errores, setErrores] = useState({});
  const [loading, setLoading] = useState(false);

  const { setIsAut, setUser } = useAut();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!formData.correo.trim()) nuevosErrores.correo = 'El correo es requerido';
    if (!formData.password) nuevosErrores.password = 'La contraseña es requerida';  // corregido typo aquí
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (validarFormulario()) {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json(); // ✅ solo una vez

      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }

      // ✅ Nuevo bloque para manejar token y usuario
      if (data.token && data.user) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user)); // guardo el usuario

        setIsAut(true);
        setUser(data.user); // asegúrate de tener `setUser` del contexto

        navigate('/perfil');
      } else {
        throw new Error('No se recibió el token o usuario del servidor.');
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }
};


  return (
    <form className='register' onSubmit={handleSubmit}>
      <h2>Iniciar Sesión</h2>
      <div>
        <input
          className='mi-input-L'
          type="email"
          placeholder="Correo"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
        />
        {errores.correo && <p>{errores.correo}</p>}
      </div>
      <div>
        <input
          className='mi-input-L'
          type="password"
          placeholder="Contraseña"
          name="password"    
          value={formData.password}
          onChange={handleChange}
        />
        {errores.password && <p>{errores.password}</p>}
      </div>
      <button className='btn-style' type="submit" disabled={loading}>
        {loading ? 'Cargando...' : 'Ingresar'}
      </button>
      <div className='olviddaste'>
        <Link to="/register">Regístrate aquí</Link>
        <a href="#">¿Olvidaste tu contraseña?</a>
      </div>
    </form>
  );
};

export default Login;
