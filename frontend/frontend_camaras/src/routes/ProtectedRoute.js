import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const ProtectedRoute = ({ children }) => {
  const { authTokens, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>; // Puedes personalizar el mensaje de carga
  }

  // Si no hay tokens, redirige al login
  return authTokens ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
