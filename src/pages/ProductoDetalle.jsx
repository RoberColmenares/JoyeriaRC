import React, { useContext, useEffect, useRef, useState } from 'react';
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
  const location = useLocation();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const BASE_URL = `${apiUrl}/uploads/`;
  const detalleRef = useRef(null);

  // Scroll a sección detalle si viene en state.location
useEffect(() => {
  if (location.state?.scrollTo === 'detalles' && productoSeleccionado && detalleRef.current) {
    const element = detalleRef.current;
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}, [location.state, productoSeleccionado]);

  // Buscar producto seleccionado en productos
  useEffect(() => {
    if (!loading && productos.length > 0) {
      const encontrado = productos.find(p => p.id.toString() === id.toString());
      setProductoSeleccionado(encontrado || null);
    }
  }, [id, productos, loading]);

  // Scroll cuando hash cambia
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [location.hash]);

  const images = productoSeleccionado?.imagenes
    ? productoSeleccionado.imagenes.map(img => BASE_URL + img)
    : productoSeleccionado
    ? [BASE_URL + productoSeleccionado.imagen]
    : [];

  const handleQuantityChange = (e) => {
    let value = parseInt(e.target.value);
    if (isNaN(value)) return;
    if (value < 1) value = 1;
    if (productoSeleccionado && value > productoSeleccionado.stok) value = productoSeleccionado.stok;
    setQuantity(value);
  };

  const increaseQuantity = () => {
    if (productoSeleccionado) {
      setQuantity(prev => (prev < productoSeleccionado.stok ? prev + 1 : prev));
    }
  };

  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : prev));
  };

  const NaviProductos = (producto) => {
  
    navigate(`/producto/${producto.id}#producto-detalle`, {
      state: { scrollTo: 'detalles' } // esto lo envías al componente destino
    });
  };

  const handleAgregarAlCarrito = (producto, e) => {
    e.stopPropagation();
    agregarItem(producto);
  };

  if (loading) return <div className="loading">Cargando detalle del producto...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!loading && !productoSeleccionado) return <div className="not-found">Producto no encontrado</div>;

  return (
    <>
      <div id='producto-detalle' className="producto-detalle-container">
        <div className="images-section">
          <div className="main-image-container">
            <img
              src={images[selectedImage]}
              alt={productoSeleccionado.nombre}
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
                {productoSeleccionado.vendedor_nombre} {productoSeleccionado.vendedor_apellido || ''}
              </p>
              <p>
                <strong style={{ marginRight: '10px' }}>Email:</strong>{' '}
                {productoSeleccionado.vendedor_correo || 'No disponible'}
              </p>
            </div>
          </div>
        </div>

        <div className="info-section" ref={detalleRef}>
          <div className="product-details">
            <div className="margen">
              <h1>{productoSeleccionado.nombre}</h1>
              <p>Precio: ${productoSeleccionado.precio}</p>
            </div>

            <div className="add-to-cart">
              <div className="quantity-selector">
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
                    min="1"
                    max={productoSeleccionado.stok}
                    value={quantity}
                    onChange={handleQuantityChange}
                  />
                  <button
                    type="button"
                    onClick={increaseQuantity}
                    className="btn-stylec"
                    disabled={quantity >= productoSeleccionado.stok}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="btn-stylec"
                disabled={productoSeleccionado.stok <= 0}
                onClick={(e) => handleAgregarAlCarrito(productoSeleccionado, e)}
              >
                {productoSeleccionado.stok > 0 ? 'Añadir al carrito' : 'Sin stock'}
              </button>
            </div>

            <div className="product-meta">
              <div>
                <p><strong>Tipo: </strong> {productoSeleccionado.tipo_prenda}</p>
                <p><strong>Stock: </strong> {productoSeleccionado.stok}</p>
              </div>
              <div>
                <p><strong>Material: </strong> {productoSeleccionado.tipo_metal}</p>
              </div>
              <div>
                {productoSeleccionado.talla && <p><strong>Talla:</strong> {productoSeleccionado.talla}</p>}
                {productoSeleccionado.color && <p><strong>Color:</strong> {productoSeleccionado.color}</p>}
              </div>
            </div>

            <div className="product-description">
              <p>{productoSeleccionado.descripcion}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="Card-container fade">
        <ul className="card">
          {productos.slice(0, 4).map((p) => (
            <li
              className="card-content"
              key={p.id}
              onClick={() => NaviProductos(p)}
            >
              <div className="seg4">
                <img src={`${BASE_URL}/${p.imagen}`} alt={p.nombre} />
              </div>
              <div className="seg1">
                <p className="card-title">{p.tipo_metal} - {p.tipo_prenda}</p>
              </div>
              <div className="seg2">
                <p className="card-name">{p.nombre}</p>
                <p className="card-description">{p.descripcion}</p>
              </div>
              <div className="seg3">
                <p className="card-price">${p.precio}</p>
                <button
                  className="btn-stylec"
                  disabled={p.stok <= 0}
                  onClick={(e) => handleAgregarAlCarrito(p, e)}
                >
                  {p.stok > 0 ? 'Añadir al carrito' : 'Sin stock'}
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
