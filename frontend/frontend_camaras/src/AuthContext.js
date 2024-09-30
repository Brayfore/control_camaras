import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode' // Asegúrate de tener instalada esta librería

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens')) : null);
  const [user, setUser] = useState(() => authTokens ? jwtDecode(authTokens.access) : null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens]);

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:8000/api/token/', { username, password });
      setAuthTokens(response.data);
      localStorage.setItem('tokens', JSON.stringify(response.data));
      setUser(jwtDecode(response.data.access));
    } catch (error) {
      console.error('Error al iniciar sesión', error);
      throw error; // Permitir el manejo de errores en el frontend
    }
  };

  const logout = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('tokens');
  };

  return (
    <AuthContext.Provider value={{ authTokens, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
