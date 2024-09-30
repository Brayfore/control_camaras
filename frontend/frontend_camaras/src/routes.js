import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './screens/Login';
import CameraControlSystem from '../src/components/home';
import ProtectedRoute from './routes/ProtectedRoute';
import { AuthProvider } from './AuthContext';

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <CameraControlSystem/>
              </ProtectedRoute>
            } 
          />
          {/* Redirigir cualquier otra ruta al login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRoutes;
