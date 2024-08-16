// AppRoutes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './screens/login';
import CameraControlSystem from './components/home';
import { useAuth, AuthProvider } from './AuthContext';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Ruta para el login */}
        <Route
          path="/"
          element={!isAuthenticated ? <Login /> : <Navigate to="/home" />}
        />
        
        {/* Ruta para el home */}
        <Route
          path="/home"
          element={isAuthenticated ? <CameraControlSystem /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

const App = () => (
  <AuthProvider>
    <AppRoutes />
  </AuthProvider>
);

export default App;
// src/routes/AppRoutes.js
// src/routes/AppRoutes.js
// src/routes/AppRoutes.js
// src/routes/AppRoutes.js
// src/routes/AppRoutes.js

