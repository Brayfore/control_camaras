/*import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Asegúrate de tener instalada esta librería

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens')) : null);
  const [user, setUser] = useState(() => authTokens ? jwtDecode(authTokens.access) : null);
  const [loading, setLoading] = useState(true);

  // Función para iniciar sesión
  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:8000/api/token/', { username, password });
      const tokens = response.data;
  
      // Verifica que el token de acceso se haya recibido
      if (!tokens.access || !tokens.refresh) {
        throw new Error('Error al recibir los tokens');
      }
  
      // Guarda los tokens en el localStorage
      localStorage.setItem('tokens', JSON.stringify(tokens));
  
      // Actualiza el estado de autenticación
      setAuthTokens(tokens);
      setUser(jwtDecode(tokens.access)); // Decodifica el token para obtener los datos del usuario
    } catch (error) {
      console.error('Error al iniciar sesión', error);
      throw error;
    }
  };
  
  // Función para cerrar sesión
  const logout = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('tokens');
  };

  useEffect(() => {
    // Verifica si hay tokens almacenados en localStorage al cargar el componente
    if (authTokens) {
      setUser(jwtDecode(authTokens.access));
    }
    setLoading(false); // Ya terminó la carga inicial
  }, [authTokens]);

  return (
    <AuthContext.Provider value={{ authTokens, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
//CÓDIGO BUENO EL DE AQUI ABAJITO
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Importa jwtDecode para decodificar el token

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens')) : null);
  const [user, setUser] = useState(() => authTokens ? jwtDecode(authTokens.access) : null);
  const [loading, setLoading] = useState(true);

  // Función para verificar si el token ha expirado
  const isTokenExpired = (token) => {
    if (!token) return true;
    
    const decodedToken = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
    return decodedToken.exp < now;  // Devuelve true si el token ya ha expirado
  };

  // Función para iniciar sesión
  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:8000/api/token/', { username, password });
      const tokens = response.data;

      if (!tokens.access || !tokens.refresh) {
        throw new Error('Error al recibir los tokens');
      }

      const decodedUser = jwtDecode(tokens.access);
      console.log('Usuario decodificado:', decodedUser);

      // Guarda los tokens en el localStorage
      localStorage.setItem('tokens', JSON.stringify(tokens));

      // Actualiza el estado de autenticación
      setAuthTokens(tokens);
      setUser(decodedUser);
    } catch (error) {
      console.error('Error al iniciar sesión', error);
      throw error;
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('tokens');
    window.location.href = '/login'; // Redirigir al login después del logout
  };

  useEffect(() => {
    // Verifica si el token ha expirado cuando se carga el componente
    if (authTokens && isTokenExpired(authTokens.access)) {
      console.log('El token ha expirado, redirigiendo a login...');
      logout();  // Si el token ha expirado, cerramos sesión y redirigimos
    } else if (authTokens) {
      setUser(jwtDecode(authTokens.access));
    }
    setLoading(false); // Ya terminó la carga inicial
  }, [authTokens]);

  return (
    <AuthContext.Provider value={{ authTokens, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Importa jwtDecode para decodificar el token

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens')) : null
  );
  const [user, setUser] = useState(() => (authTokens ? jwtDecode(authTokens.access) : null));
  const [loading, setLoading] = useState(true);

  // Función para verificar si el token ha expirado
  const isTokenExpired = (token) => {
    if (!token) return true;
    
    const decodedToken = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
    return decodedToken.exp < now;  // Devuelve true si el token ya ha expirado
  };

  // Función para iniciar sesión
  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:8000/api/token/', { username, password });
      const tokens = response.data;

      if (!tokens.access || !tokens.refresh) {
        throw new Error('Error al recibir los tokens');
      }

      const decodedUser = jwtDecode(tokens.access);
      console.log('Usuario decodificado:', decodedUser);

      // Guarda los tokens en el localStorage
      localStorage.setItem('tokens', JSON.stringify(tokens));

      // Actualiza el estado de autenticación
      setAuthTokens(tokens);
      setUser(decodedUser);
    } catch (error) {
      console.error('Error al iniciar sesión', error);
      throw error;
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('tokens');
    window.location.href = '/login'; // Redirigir al login después del logout
  };

  useEffect(() => {
    // Verifica si el token ha expirado cuando se carga el componente
    if (authTokens && isTokenExpired(authTokens.access)) {
      console.log('El token ha expirado, redirigiendo a login...');
      logout();  // Si el token ha expirado, cerramos sesión y redirigimos
    } else if (authTokens) {
      setUser(jwtDecode(authTokens.access));
    }
    setLoading(false); // Ya terminó la carga inicial
  }, [authTokens]);

  return (
    <AuthContext.Provider value={{ authTokens, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);*/

import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Asegúrate de tener instalado jwt-decode

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens')) : null);
  const [user, setUser] = useState(() => authTokens ? jwtDecode(authTokens.access) : null);
  const [loading, setLoading] = useState(true);

  // Verificar si el token ha expirado
  const isTokenExpired = (token) => {
    if (!token) return true;
    const decodedToken = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
    return decodedToken.exp < now; // Devuelve true si el token ha expirado
  };

  // Verificar el token y redirigir al login si ha expirado
  const checkTokenExpiration = () => {
    if (authTokens && isTokenExpired(authTokens.access)) {
      logout();  // Si el token ha expirado, cerrar sesión y redirigir
    }
  };

  // Función de login
  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:8000/api/token/', { username, password });
      const tokens = response.data;

      if (!tokens.access || !tokens.refresh) {
        throw new Error('Error al recibir los tokens');
      }

      const decodedUser = jwtDecode(tokens.access);

      // Guarda los tokens en localStorage
      localStorage.setItem('tokens', JSON.stringify(tokens));

      // Actualiza el estado de autenticación
      setAuthTokens(tokens);
      setUser(decodedUser);
    } catch (error) {
      console.error('Error al iniciar sesión', error);
      throw error;
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('tokens');
    window.location.href = '/login'; // Redirigir al login después del logout
  };

  useEffect(() => {
    // Verificar si el token ha expirado al cargar la aplicación
    checkTokenExpiration();
    setLoading(false); // Termina la carga inicial
  }, [authTokens]);

  return (
    <AuthContext.Provider value={{ authTokens, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

