import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ProductosContext } from '../context/ContextApi';
import '../style/DetalleP.css';
import { CarritoContext } from '../context/carritoContext';
const apiUrl = import.meta.env.VITE_API_URL; 

const ProductoDetalle = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { productos, loading, error } = useContext(ProductosContext);
  const { agregarItem } = useContext(CarritoContext);
  const { hash } = useLocation();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // hooks siempre al inicio, sin condicionales
  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [hash]);

  // Producto encontrado
  const producto = productos.find(p => p.id === parseInt(id));

  // URL base para imágenes
  const BASE_URL = `${apiUrl}/uploads/`;
  const images = producto?.imagenes
    ? producto.imagenes.map(img => BASE_URL + img)
    : producto
    ? [BASE_URL + producto.imagen]
    : [];

  // Funciones para cantidad
  const handleQuantityChange = (e) => {
    let value = parseInt(e.target.value);
    if (isNaN(value)) return;
    if (value < 1) value = 1;
    if (producto && value > producto.stok) value = producto.stok;
    setQuantity(value);
  };

  const increaseQuantity = () => {
    if (producto) setQuantity(prev => (prev < producto.stok ? prev + 1 : prev));
  };

  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : prev));
  };

  const navigateToProducto = (producto) => {
    navigate(`/producto/${producto.id}#detalle-producto`);
  };

  const handleAgregarAlCarrito = (producto, e) => {
    e.stopPropagation();
    agregarItem(producto);
  };

  // Renderizado condicional SIN afectar el orden de hooks
  if (loading) {
    return <div className="loading">Cargando detalle del producto...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!producto) {
    return <div className="not-found">Producto no encontrado</div>;
  }

  // JSX principal
  return (
    <>
      <div id="detalle-producto" className="producto-detalle-container">
        <div className="images-section">
          <div className="main-image-container">
            <img
              src={images[selectedImage]}
              alt={producto.nombre}
              className="main-image"
              loading="lazy"
            />
          </div>

          {images.length > 1 && (
            <div className="thumbnails">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Miniatura ${index + 1}`}
                  className={`thumbnail ${selectedImage === index ? 'selected' : ''}`}
                  onClick={() => setSelectedImage(index)}
                  loading="lazy"
                />
              ))}
            </div>
          )}

          <div className="seller-info">
            <div className="seller-details">
              <p>
                <strong style={{ marginRight: '10px' }}>Publicado por:</strong>
                {producto.vendedor_nombre} {producto.vendedor_apellido || ''}
              </p>
              <p>
                <strong style={{ marginRight: '10px' }}>Email:</strong>{' '}
                {producto.vendedor_correo || 'No disponible'}
              </p>
            </div>
          </div>
        </div>

        <div className="info-section">
          <div className="product-details">
            <div className="margen">
              <h1>{producto.nombre}</h1>
              <p>Precio: ${producto.precio}</p>
            </div>

            <div className="add-to-cart">
              <div className="quantity-selector">
                <label htmlFor="quantity">
                  <p>
                    <strong></strong>
                  </p>
                </label>
                <div className="input-buttons">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    className="btn-stylec"
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    max={producto.stok}
                    value={quantity}
                    onChange={handleQuantityChange}
                  />
                  <button
                    type="button"
                    onClick={increaseQuantity}
                    className="btn-stylec"
                    disabled={quantity >= producto.stok}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="btn-stylec"
                disabled={producto.stok <= 0}
                onClick={(e) => handleAgregarAlCarrito(producto, e)}
              >
                {producto.stok > 0 ? 'Añadir al carrito' : 'Sin stock'}
              </button>
            </div>

            <div className="product-meta">
              <div>
                <p>
                  <strong>Tipo: </strong> {producto.tipo_prenda}
                </p>
                <p>
                  <strong>Stock: </strong> {producto.stok}
                </p>
              </div>
              <div>
                <p>
                  <strong>Material: </strong> {producto.tipo_metal}
                </p>
              </div>
              <div>
                {producto.talla && (
                  <p>
                    <strong>Talla:</strong> {producto.talla}
                  </p>
                )}
                {producto.color && (
                  <p>
                    <strong>Color:</strong> {producto.color}
                  </p>
                )}
              </div>
            </div>

            <div className="product-description">
              <p>{producto.descripcion}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="Card-container fade">
        <ul className="card">
          {productos.slice(0, 4).map((producto) => (
            <li
              className="card-content"
              key={producto.id}
              onClick={() => navigateToProducto(producto)}
            >
              <div className="seg4">
                
                <img
                  src={`${apiUrl}/uploads/${producto.imagen}`}
                  alt={producto.nombre}
                />
              </div>
              <div className="seg1">
                <p className="card-title">
                  {producto.tipo_metal} - {producto.tipo_prenda}
                </p>
              </div>

              <div className="seg2">
                <p className="card-name">{producto.nombre}</p>
                <p className="card-description">{producto.descripcion}</p>
              </div>

              <div className="seg3">
                <p className="card-price">${producto.precio}</p>
                <button
                  className="btn-stylec"
                  disabled={producto.stok <= 0}
                  onClick={(e) => handleAgregarAlCarrito(producto, e)}
                >
                  {producto.stok > 0 ? 'Añadir al carrito' : 'Sin stock'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ProductoDetalle;
