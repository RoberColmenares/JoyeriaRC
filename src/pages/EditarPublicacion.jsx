// src/pages/EditarPublicacion.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../style/Crear.css";
const apiUrl = import.meta.env.VITE_API_URL; 

const EditarPublicacion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState({
    nombre: '',
    descripcion: '',
    tipo_prenda: '',
    tipo_metal: '',
    talla: '',
    color: '',
    precio: '',
    stok: ''
  });

  useEffect(() => {
    const obtenerProducto = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch(`${apiUrl}/api/productos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setFormulario(data);
      } else {
        alert('Error al cargar el producto');
      }
    };
    obtenerProducto();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const res = await fetch(`${apiUrl}/api/productos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formulario),
    });

    const data = await res.json();
    if (res.ok) {
      alert('Producto actualizado correctamente');
      navigate("/perfil");
    } else {
      alert(data.message || 'Error al actualizar');
    }
  };

  return (
    <form className='formu' onSubmit={handleSubmit}>
      <h2>Editar Producto</h2>
      <input className='imput' type="text" name="nombre" placeholder="Nombre" value={formulario.nombre} onChange={handleChange} />
      <input className='imput' type="text" name="color" placeholder="Color" value={formulario.color} onChange={handleChange} />
      
      <div>
        <select name="tipo_prenda" value={formulario.tipo_prenda} onChange={handleChange}>
          <option value="">Tipo de Prenda</option>
          <option value="anillo">Anillo</option>
          <option value="pulsera">Pulsera</option>
          <option value="collar">Collar</option>
          <option value="reloj">Reloj</option>
          <option value="zarcillo">Zarcillo</option>
        </select>

        <select name="tipo_metal" value={formulario.tipo_metal} onChange={handleChange}>
          <option value="">Tipo de Metal</option>
          <option value="oro">Oro</option>
          <option value="plata">Plata</option>
          <option value="bronce">Bronce</option>
          <option value="metal">Metal</option>
        </select>
      </div>

      <input className='imput' type="text" name="talla" placeholder="Talla" value={formulario.talla} onChange={handleChange}/>
      <input className='imput' type="number" name="stok" placeholder="Stock" value={formulario.stok} onChange={handleChange} />
      <textarea name="descripcion" placeholder="Descripción" value={formulario.descripcion} onChange={handleChange} />
      <input className='imput' type="number" name="precio" placeholder="Precio" value={formulario.precio} onChange={handleChange} />

      <div style={{display:"flex", justifyContent:"center"}}>
        <button className='btn-style' style={{width:"160px"}} type="submit">Actualizar</button>
      </div>
    </form>
  );
};

export default EditarPublicacion;
