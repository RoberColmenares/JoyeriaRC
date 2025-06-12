import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductosContext } from '../context/ContextApi';
import { CarritoContext } from '../context/carritoContext';
const apiUrl = import.meta.env.VITE_API_URL;

const Productos = () => {
  const { productos, loading, error } = useContext(ProductosContext);
  const { categoria } = useParams();
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const navigate = useNavigate();
  const { agregarItem } = useContext(CarritoContext);

  useEffect(() => {
    const filtrados = categoria
      ? productos.filter(p => p.tipo === categoria)
      : productos;
    setProductosFiltrados(filtrados);
  }, [categoria, productos]);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  const NaviProductos = (producto) => {
  
    navigate(`/producto/${producto.id}#producto-detalle`, {
      state: { scrollTo: 'detalles' } // esto lo envías al componente destino
    });
  };

  const handleAgregarAlCarrito = (producto, e) => {
    e.stopPropagation();
    console.log('Intentando agregar al carrito:', producto);
    agregarItem(producto);
  };

  return (
    <div className='fade'>
      {productosFiltrados.length === 0 ? (
        <p>No hay productos en esta categoría</p>
      ) : (
        <ul className="card">
          {productosFiltrados.map((producto) => {
      
            return (
              <li
                className="card-content"
                key={producto.id}
                onClick={() => NaviProductos(producto)}
              >
                <div className="seg4">
                  <img
                    src={`${apiUrl}/uploads/${producto.imagen}`}
                    alt={producto.nombre}
                  />
                </div>

                <div className="seg1">
                  <p className="card-title">
                    {producto.tipo_prenda} - {producto.tipo_metal}
                  </p>
                </div>

                <div className="seg2">
                  <p className="card-name">{producto.nombre}</p>
                  <p className="card-description">{producto.descripcion}</p>
                </div>

                <div className="seg3">
                  <p className="card-price">${producto.precio}</p>
                  <button
                    className="btn-style"
                    onClick={(e) => handleAgregarAlCarrito(producto, e)}
                  >
                    Agregar al carrito
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Productos;
