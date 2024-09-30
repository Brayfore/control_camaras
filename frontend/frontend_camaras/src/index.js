import React from 'react';
import { createRoot } from 'react-dom/client';
import AppRoutes from './routes';
import { AuthProvider } from './AuthContext'; // Contexto de autenticación

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <AuthProvider>
    <AppRoutes />
  </AuthProvider>
);
