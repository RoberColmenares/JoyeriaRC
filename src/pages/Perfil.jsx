import React, { useEffect, useState } from 'react';
import { useAut } from '../context/ContextProvider';
import "../style/Perfil.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useLocation, useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;  

const Perfil = () => {
  const { user, loading } = useAut();
  const [publicaciones, setPublicaciones] = useState([]);
  const navigate = useNavigate();
   const { hash } = useLocation();
  
  useEffect(() => {
    const fetchPublicaciones = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`${apiUrl}/api/productos-usuario`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setPublicaciones(data);
      } catch (error) {
        console.error("Error al obtener publicaciones:", error);
      }
    };

    if (user) {
      fetchPublicaciones();
    }
  }, [user]);

if (loading || !user) return <p>Cargando perfil...</p>;


    useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        // Ajustamos scroll para que no quede bajo la barra (ejemplo 80px)
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [hash]);



  const eliminarProducto = async (id, event) => { // Agrega 'event' como parámetro
  event.stopPropagation(); // Detener la propagación del evento
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${apiUrl}/api/productos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      alert("Producto eliminado");
      setPublicaciones(publicaciones.filter((pub) => pub.id !== id));
    } else {
      alert("Error al eliminar el producto");
    }
  } catch (error) {
    console.error("Error al eliminar producto:", error);
  }
};

  const NaviProductos = (id) => {
    navigate(`/producto/${id}#producto-detalle`, {
      state: { scrollTo: 'detalles' } // esto lo envías al componente destino
    });
  };



 

  return (
    <div id="Prfil" className='conteiner-perfil'>

      <div className='info-user'>

        <h2>{user?.nombre}</h2>
        <h2>{user?.apellido}</h2>
        <p style={{display:"flex", alignItems:"center"}}> <MdEmail style={{ marginRight:"20px" , fontSize: "1.4em", }}></MdEmail>{user?.correo}</p>
        <p>Activo desde: {new Date(user?.fecha_registro).toLocaleDateString()}</p>
        <p>Total de publicaciones: <strong>{publicaciones.length}</strong></p>

          <Link to="/crear-publicacion" className="btn-style">Publicar</Link>

      </div>

      <div className='publicaciones fade'>
          <h3 style={{textAlign:"center", margin:"20px"}}>Tus Publicaciones</h3>
          {publicaciones.length === 0 ? (
            <p style={{textAlign:"center"}}>No tienes publicaciones aún.</p>
          ) : (
            <ul className='card'>
              {publicaciones.map((pub) => (
              <li  onClick={() => NaviProductos(pub.id)}  key={pub.id}   className="card-content">
          <div className='func-btn'>
            {/* Pasa el evento al llamar a eliminarProducto */}
            <button onClick={(event) => eliminarProducto(pub.id, event)} title="Eliminar">
              <FaTrash style={{ color: "red", fontSize: "2.2em" }} />
            </button>

            <button
              onClick={(event) => {
                event.stopPropagation();
                navigate(`/editar-publicacion/${pub.id}`);
              }}
              title="Editar"
            >
              <FaEdit style={{ color: "blue", fontSize: "2.2em" }} />
            </button>
          </div>
                   <div>
                    <img className="seg4" src={pub.imagen} alt={pub.nombre} />
                   </div>
                   

            <div className="seg1">
              <p className="card-title">{pub.tipo_prenda} - {pub.tipo_metal}</p>
            </div>

            <div>
              <div className="seg2">
              <p className="card-name">{pub.nombre}</p>
              <p className="card-description">{pub.descripcion}</p>
            </div>

            <div className="seg3">
              <p className="card-price">${pub.precio}</p>

            </div>
            
        </div>


        <div >


                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>


      
    </div>
  );
};

export default Perfil;