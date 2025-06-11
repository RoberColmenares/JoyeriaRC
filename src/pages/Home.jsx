import React, { useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import "../style/Card.css"
import { ProductosContext } from '../context/ContextApi'; 
import imagen1 from "../assets/Imagen/galeria/register.png"
import imagen2 from "../assets/Imagen/galeria/promo.png"
import imagen3 from "../assets/Imagen/galeria/reloj.png"
import { CarritoContext } from '../context/carritoContext';
const apiUrl = import.meta.env.VITE_API_URL; 

const Home = () => {
    const { agregarItem } = useContext(CarritoContext);
    const navigate = useNavigate();

    const { productos, loading, error } = useContext(ProductosContext);
    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p>Error: {error}</p>;


  const NaviProductos = (producto) => {
    navigate(`/producto/${producto.id}#detalle-producto`);
  }

     const handleAgregarAlCarrito = (producto, e) => {
    e.stopPropagation();

    console.log('Intentando agregar al carrito:', producto);
    agregarItem(producto);
    
  };


  return (

    <>
      <div className='galeria-Conteiner'>
        
        <div><Link to="/register"><img src={imagen1} alt="" /></Link></div>
        <div> <Link to="/productos"><img src={imagen2} alt="" /></Link></div>
        <div><Link to="/productos"><img src={imagen3}alt="" /></Link></div>

      </div>

    <div className='Card-container fade'>
          <ul className="card">
            {productos.slice(0, 4).map((producto) => (
              <li className="card-content"  key={producto.id} onClick={() => NaviProductos(producto)}>
              <div className="seg4">  <img src={`${apiUrl}/uploads/${producto.imagen}`} alt={producto.nombre} /></div>
                <div className='seg1'><p className="card-title" >{producto.tipo_prenda} - {producto.tipo_metal}</p></div>

                <div className='seg2'>
                <p  className="card-name">{producto.nombre}</p>
                <p className="card-description">{producto.descripcion}</p>
                </div>

                <div className='seg3'>
                  <p className="card-price">${producto.precio}</p>
                  <button onClick={(e) => handleAgregarAlCarrito(producto, e)} className="btn-style">Agregar al carrito</button>
                </div>

              </li>
            ))}
          </ul>
      </div>
    </>

  )
}

export default Home
