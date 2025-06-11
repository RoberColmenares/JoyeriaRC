import React, { useState } from 'react';
import '../style/RegLog.css';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;  
const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    contraseña: '',
    confirmarContraseña: '',
    aceptarTerminos: false
  });

  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!formData.nombre.trim()) nuevosErrores.nombre = 'El nombre es requerido';
    if (!formData.apellido.trim()) nuevosErrores.apellido = 'El apellido es requerido';
    if (!formData.correo.trim()) nuevosErrores.correo = 'El correo es requerido';
    else if (!/\S+@\S+\.\S+/.test(formData.correo)) nuevosErrores.correo = 'Correo no válido';
    
    if (!formData.contraseña) nuevosErrores.contraseña = 'La contraseña es requerida';
    if (formData.contraseña !== formData.confirmarContraseña) nuevosErrores.confirmarContraseña = 'Las contraseñas no coinciden';
    
    if (!formData.aceptarTerminos) nuevosErrores.aceptarTerminos = 'Debes aceptar los términos y condiciones';

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (validarFormulario()) {
    try {
      const response = await fetch(`${apiUrl}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          apellido: formData.apellido,
          correo: formData.correo,
          password: formData.contraseña,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al registrar usuario');
      }

      const data = await response.json();
      console.log('Usuario registrado con éxito:', data);
      alert('¡Registro exitoso!');
      navigate('/perfil');
    } catch (error) {
      console.error('Error al registrar:', error.message);
      alert(`Error: ${error.message}`);
    }
  }
};


  return (
    <form className='register' onSubmit={handleSubmit}>
      <h2>Registro</h2>

      <div>
        <div>
        <input  className="mi-input" type="text" placeholder='Nombre' name="nombre" value={formData.nombre} onChange={handleChange} />
        {errores.nombre && <p>{errores.nombre}</p>}
      </div>

      <div>
        <input className="mi-input" type="text" placeholder='Apellido' name="apellido" value={formData.apellido} onChange={handleChange} />
        {errores.apellido && <p>{errores.apellido}</p>}
      </div>

      <div>
        <input className="mi-input" type="email" placeholder='Correo' name="correo" value={formData.correo} onChange={handleChange} />
        {errores.correo && <p>{errores.correo}</p>}
      </div>

      <div>
        <input className="mi-input" type="password"  placeholder='Contraseña' name="contraseña" value={formData.contraseña} onChange={handleChange} />
        {errores.contraseña && <p>{errores.contraseña}</p>}
      </div>

      <div>
        <input className="mi-input" type="password" placeholder='Repita Contraseña' name="confirmarContraseña" value={formData.confirmarContraseña} onChange={handleChange} />
        {errores.confirmarContraseña && <p>{errores.confirmarContraseña}</p>}
      </div>
      </div>

      <div className='acepto'>
        <div>
        <label>
          <input style={{margin: '5px'}} type="checkbox" name="aceptarTerminos" checked={formData.aceptarTerminos} onChange={handleChange} />
          Acepto los términos y condiciones
        </label>
        {errores.aceptarTerminos && <p>{errores.aceptarTerminos}</p>}
        </div>

        <div>
          <button className='btn-style' type="submit">Registrarse</button>
        </div> 
      </div>
    </form>
  );
};

export default Register;
