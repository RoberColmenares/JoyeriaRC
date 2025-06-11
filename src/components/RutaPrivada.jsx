import React from 'react';
import { useAut } from '../context/ContextProvider';
import { Outlet, Navigate } from 'react-router-dom';

const RutaPrivada = () => {
  const { isAut, loading } = useAut();

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!isAut) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default RutaPrivada;
