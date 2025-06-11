import React, { createContext, useState, useEffect } from 'react';
const apiUrl = import.meta.env.VITE_API_URL; 

// Crear el contexto
export const ProductosContext = createContext();

// Crear el provider
export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener datos desde la API
  const fetchProductos = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/productos`); 
      if (!response.ok) throw new Error('Error al obtener los productos');
      const data = await response.json();
      setProductos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Ejecutar al montar el componente
  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <ProductosContext.Provider value={{ productos, loading, error }}>
      {children}
    </ProductosContext.Provider>
  );
};
