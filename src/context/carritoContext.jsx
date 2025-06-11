import React, { createContext, useState, useEffect } from 'react';

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  // Leer carrito desde localStorage o iniciar vacío
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarItem = (producto) => {
    setCarrito((prevCarrito) => {
      const existeIndex = prevCarrito.findIndex(item => item.id === producto.id);

      if (existeIndex !== -1) {
        const carritoActualizado = [...prevCarrito];
        const itemExistente = carritoActualizado[existeIndex];
        const cantidadActual = Number(itemExistente.cantidad) || 0;

        carritoActualizado[existeIndex] = {
          ...itemExistente,
          cantidad: cantidadActual + 1,
        };

        return carritoActualizado;
      } else {
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });
  };

  const eliminarItem = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter(item => item.id !== id));
  };

  return (
    <CarritoContext.Provider value={{ carrito, agregarItem, eliminarItem }}>
      {children}
    </CarritoContext.Provider>
  );
};
