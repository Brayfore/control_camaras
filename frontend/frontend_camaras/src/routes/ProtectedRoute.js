// src/routes/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const ProtectedRoute = ({ children }) => {
  const { authTokens } = useAuth();

  return authTokens ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

