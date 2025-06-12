import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CarritoContext } from '../context/carritoContext';
const apiUrl = import.meta.env.VITE_API_URL;  

const ProductosPorCategoria = () => {
  const { categoria } = useParams();
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { agregarItem } = useContext(CarritoContext);
  

  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true);
      setError(null);
      try {
       
        const response = await fetch(`${apiUrl}/api/categoria/${categoria}`);
        const text = await response.text();

        try {
          const data = JSON.parse(text);
          setProductos(data);
        } catch (jsonErr) {
          console.error('Respuesta no es JSON:', text);
          setError('Respuesta inválida del servidor');
        }
      } catch (err) {
        setError('Error al cargar productos');
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [categoria]);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;
  if (productos.length === 0) return <p>No hay productos en esta categoría.</p>;

  // Navegar a detalle de producto
   const NaviProductos = (producto) => {
  
    navigate(`/producto/${producto.id}#producto-detalle`, {
      state: { scrollTo: 'detalles' } // esto lo envías al componente destino
    });
  };

  // Agregar producto al carrito usando contexto (sin redirigir)
  const handleAgregarAlCarrito = (producto, e) => {
    e.stopPropagation();
    


    agregarItem(producto);

  };

  return (
    <div className='Card-container fade'>
      <ul className="card">
        {productos
          .map((producto) => (
            <li
              className="card-content"
              key={producto.id}
              onClick={() => NaviProductos(producto)}
              style={{ cursor: 'pointer' }}
            >
              <div className="seg4">
                <img
                  src={`${apiUrl}/uploads/${producto.imagen}`}
                  alt={producto.nombre}
                />
              </div>
              <div className='seg1'>
                <p className="card-title">
                  {producto.tipo_prenda} - {producto.tipo_metal}
                </p>
              </div>

              <div className='seg2'>
                <p className="card-name">{producto.nombre}</p>
                <p className="card-description">{producto.descripcion}</p>
              </div>

              <div className='seg3'>
                <p className="card-price">${producto.precio}</p>
                <button
                  className="btn-style"
                  onClick={(e) => handleAgregarAlCarrito(producto, e)}
                >
                  Agregar al carrito
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ProductosPorCategoria;
