import React, { useContext, useEffect, useState, useRef } from 'react';
import miImage from "../assets/Imagen/Logo.png";
import "../style/Barra.css";
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useAut } from "../context/ContextProvider";
import LogoutButton from '../pages/LogoutButton';
import "../style/Perfil.css";
import { CarritoContext } from '../context/carritoContext';

const categorias  = ['anillo', 'reloj', 'zarcillo', 'pulsera', 'collar'];

const Barra = () => {
  const { carrito } = useContext(CarritoContext);
  const { isAut } = useAut();
  const navigate = useNavigate();

  const [menu, setMenu] = useState(false);
  const [isTable, setIsTable] = useState(window.innerWidth <= 768);
  const [isMobileSmall, setIsMobileSmall] = useState(window.innerWidth <= 540);
  const [showCategorias, setShowCategorias] = useState(false);

  const menuRef = useRef(null);  // referencia para detectar clics fuera

  const cantidadProductos = carrito.reduce((acc, item) => acc + (Number(item.cantidad) || 0), 0);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      setIsMobileSmall(window.innerWidth <= 540);
      setIsTable(isMobile);
      if (!isMobile) {
        setMenu(false);
        setShowCategorias(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cerrar menú si clic fuera de menú hamburguesa
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menu && menuRef.current && !menuRef.current.contains(event.target)) {
        setMenu(false);
        setShowCategorias(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menu]);

  const handleCategoriaClick = (cat) => {
    setMenu(false);
    setShowCategorias(false);
    navigate(`/categoria/${cat}`);
  };

  return (
    <div className="Contenedor-Barra fade">
      <div className="Barra">
        {/* Logo + Logout */}
        <div className='div1'>
          <Link to="/home">
            <img src={miImage} alt="Logo" />
          </Link>
          {isAut ? (
            <>
              <LogoutButton />
            </>
          ) : (
            <>
              {/* Aquí puedes agregar algo si no está autenticado */}
            </>
          )}
        </div>

        {/* Menú de navegación */}
        <div className="btn-brger" ref={menuRef}>
          {isTable ? (
            <>
              {!menu && (
                <button style={{fontSize:"30px"}} className="btn-brger" onClick={() => setMenu(true)}>☰</button>
              )}
              {menu && (
                <div className="menu-dropdown fade">
                  {/* Botón para cerrar menú */}
                  <button
                    style={{ color:"red", fontSize: "30px", margin: "10px", cursor: "pointer", background: "none", border: "none" }}
                    aria-label="Cerrar menú"
                    onClick={() => setMenu(false)}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>

                  <Link to="/home" onClick={() => setMenu(false)}>Inicio</Link>
                  <Link to="/contacto" onClick={() => setMenu(false)}>Contacto</Link>

                  {isAut && (
                    <Link to="/crear-publicacion" className="btn-style" onClick={() => setMenu(false)}>Publicar</Link>
                  )}

                  {!isAut && (
                    <>
                      <Link to="/login" className="btn-style" onClick={() => setMenu(false)}>Login</Link>
                      <Link to="/register" className="btn-style" onClick={() => setMenu(false)}>Registrarse</Link>
                    </>
                  )}

                  {/* Categorías en móvil pequeño */}
                  {isMobileSmall && (
                    <>
                      <button
                        onClick={() => setShowCategorias(!showCategorias)}
                        className="btn-selector-categoria"
                      >
                        Categorías {showCategorias ? '▲' : '▼'}
                      </button>
                      {showCategorias && (
                        <div className='despliegue-categoria'>
                          {categorias.map(cat => (
                            <button
                              key={cat}
                              onClick={() => handleCategoriaClick(cat)}
                              className="btn-categoria"
                            >
                              {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </>
          ) : (
            <>
              <Link to="/home">Inicio</Link>
              <Link to="/contacto">Contacto</Link>
            </>
          )}
        </div>

        {/* Área derecha (usuario / carrito / login / logout) */}
        <div className="auth-area">
          {isAut ? (
            <>
              {!isTable && (
                <Link to="/crear-publicacion" className="btn-style-p">Publicar</Link>
              )}
              <Link to="/perfil#Prfil">
                <FontAwesomeIcon style={{fontSize:"30px"}} className="icon" icon={faUser} />
              </Link>
              <Link to="/carrito" className="carrito-icon-container">
                <FontAwesomeIcon style={{ fontSize: "30px" }} className="icon" icon={faShoppingCart} />
                {cantidadProductos > 0 && (
                  <span className="contador-carrito">{cantidadProductos}</span>
                )}
              </Link>
            </>
          ) : (
            (!isMobileSmall && !isTable) && (
              <>
                <Link to="/login" className="btn-style">Login</Link>
                <Link to="/register" className="btn-style">Registrarse</Link>
              </>
            )
          )}
        </div>
      </div>

      {/* Categorías en desktop */}
      {!isMobileSmall && (
        <div className="barra-categorias">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoriaClick(cat)}
              className="btn-categoria"
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Barra;
