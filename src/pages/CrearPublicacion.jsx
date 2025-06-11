import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Importa el hook
import "../style/Crear.css";

const CrearPublicacion = () => {
  const [formulario, setFormulario] = useState({
    nombre: '',
    descripcion: '',
    tipo_prenda: '',
    tipo_metal: '',
    talla: '',
    color: '',
    precio: '',
    stok: '',
    imagen: null,
  });
    const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imagen') {
      setFormulario({ ...formulario, imagen: files[0] });
    } else {
      setFormulario({ ...formulario, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in formulario) {
      formData.append(key, formulario[key]);
    }

    try {
      const token = localStorage.getItem('token'); // o como lo manejes
      const res = await fetch('http://localhost:3001/api/crear-publicacion', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert('Producto creado correctamente');
        navigate('/perfil');
      } else {
        alert(data.message || 'Error al crear producto');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error');
    }
  };

  return (
    <form className='formu' onSubmit={handleSubmit} encType="multipart/form-data">
      <h2>Crear Producto</h2>
      <input className='imput' type="file" name="imagen" accept="image/*" onChange={handleChange}  />

      <div>
        <input className='imput' type="text" name="nombre" placeholder="Nombre" value={formulario.nombre} onChange={handleChange} />
        <input className='imput' type="text" name="color" placeholder="Color" value={formulario.color} onChange={handleChange} />
      </div>

      <div>
        <select name="tipo_prenda" value={formulario.tipo_prenda} onChange={handleChange} >
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

      <div>
        <input className='imput' type="text" name="talla" placeholder="Talla" value={formulario.talla} onChange={handleChange}/>
        <input  className='imput' type="number" name="stok" placeholder="Stock" value={formulario.stok} onChange={handleChange}  />
      </div>



      <textarea name="descripcion" placeholder="Descripción" value={formulario.descripcion} onChange={handleChange} />



      




      <input className='imput' type="number" name="precio" placeholder="Precio" value={formulario.precio} onChange={handleChange} />

      <div style={{display:"flex", justifyContent:"center"}}>
           <button className='btn-style ' style={{width:"160px",}} type="submit">Crear Producto</button>
      </div>



   
    </form>
  );
};

export default CrearPublicacion;

