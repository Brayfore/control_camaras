import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './screens/Login'; // Componente de login
import Home from './components/home'; // Componente protegido
import ProtectedRoute from './routes/ProtectedRoute'; // Rutas protegidas
import { AuthProvider } from './AuthContext'; // Contexto de autenticación

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="*" element={<Login />} /> {/* Redirige todo lo desconocido al login */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
