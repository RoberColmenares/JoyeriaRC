import { useContext } from 'react';
import { CarritoContext } from '../context/carritoContext';
import "../style/carrito.css";
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
const apiUrl = import.meta.env.VITE_API_URL;  

const Carrito = () => {
  const { carrito, eliminarItem } = useContext(CarritoContext);
  const navigate = useNavigate(); // Inicializa useNavigate

  // Calcular total
  const total = carrito.reduce((acc, item) => {
    const cantidad = Number(item.cantidad) || 0;
    const precio = Number(item.precio) || 0;
    return acc + cantidad * precio;
  }, 0);

  // Calcular la cantidad total de productos (suma de las cantidades de cada item)
  const cantidadTotalProductos = carrito.reduce((acc, item) => {
    const cantidad = Number(item.cantidad) || 0;
    return acc + cantidad;
  }, 0);

  // Función para manejar la navegación al checkout
  const handleIrACheckout = () => {
    // Redirige al componente CheckOut y pasa el total y la cantidad como estado
    navigate('/checkout', { state: { totalCompra: total, cantidadItems: cantidadTotalProductos } });
  };

  return (
    <>
      <div className='carrito-container'>
        {carrito.length === 0 ? (
          <p>No hay productos aún.</p>
        ) : (
          <>
            {carrito.map((item) => (
              <div className='carrito-contend' key={item.id}>
                <img
                  src={`${apiUrl}/uploads/${item.imagen}`}
                  alt={item.nombre}
                />
                <div>
                  <p className='parra'> {item.tipo_prenda}</p> <p>{item.tipo_metal}</p>
                </div>
                <h4 className='h4'>{item.descripcion}</h4>
                <p>${item.precio}</p> {/* Corregí el símbolo de & por $ */}
                <p>{item.cantidad}</p>
                <button className='btn-style-p' onClick={() => eliminarItem(item.id)}>Eliminar</button>
              </div>
            ))}
          </>
        )}
      </div>

      <div className='total-pagar'>
        <h3>Total a pagar: ${total.toFixed(2)}</h3>
        {carrito.length > 0 && ( // Solo muestra el botón si hay productos en el carrito
          <button className='btn-style' onClick={handleIrACheckout}>
            Ir a Pagar
          </button>
        )}
      </div>
    </>
  );
};

export default Carrito;