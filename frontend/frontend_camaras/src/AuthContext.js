import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Ajuste en la importación

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens')) : null
  );
  const [user, setUser] = useState(() =>
    authTokens ? jwtDecode(authTokens.access) : null
  );
  const [loading, setLoading] = useState(true);

  const getApiBaseUrl = () => {
    //console.log('getApiBaseUrl called');
    return 'http://172.168.11.229:8000/api';
  };

  const isTokenExpired = (token) => {
    if (!token) return true;
    const decodedToken = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000);
    return decodedToken.exp < now;
  };

  const logout = () => {
    console.log('Logging out');
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('tokens');
    window.location.href = '/login';
  };

  const checkTokenExpiration = useCallback(() => {
    if (authTokens && isTokenExpired(authTokens.access)) {
      console.log('Token expired');
      logout();
    }
  }, [authTokens]);

  const refreshToken = async () => {
    try {
      console.log('Attempting to refresh token');
      const response = await axiosInstance.post('/token/refresh/', {
        refresh: authTokens?.refresh,
      });
      console.log('Token refreshed successfully');

      const newTokens = {
        ...authTokens,
        access: response.data.access,
      };

      localStorage.setItem('tokens', JSON.stringify(newTokens));
      setAuthTokens(newTokens);
      setUser(jwtDecode(newTokens.access));

      return newTokens;
    } catch (error) {
      console.error('Error al refrescar el token', error);
      logout();
      throw error;
    }
  };

  const login = async (username, password) => {
    try {
      console.log('Attempting login');
      const response = await axiosInstance.post('/token/', { username, password });
      console.log('Login successful:', response.data);

      const tokens = response.data;

      if (!tokens.access || !tokens.refresh) {
        throw new Error('Error al recibir los tokens');
      }

      localStorage.setItem('tokens', JSON.stringify(tokens));
      setAuthTokens(tokens);
      setUser(jwtDecode(tokens.access));

      return tokens;
    } catch (error) {
      console.error('Error al iniciar sesión', error);

      if (error.response && error.response.status === 401) {
        throw new Error('Credenciales incorrectas. Por favor, revisa tu nombre de usuario y contraseña.');
      } else if (error.message === 'Network Error') {
        throw new Error('Error de red. No se pudo conectar con el servidor.');
      } else {
        throw new Error('Ocurrió un error inesperado. Inténtalo de nuevo.');
      }
    }
  };

  // Reutilizar axiosInstance para evitar crear múltiples instancias
  const axiosInstance = axios.create({
    baseURL: getApiBaseUrl(),
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  axiosInstance.interceptors.request.use(
    async (config) => {
      if (authTokens) {
        if (isTokenExpired(authTokens.access)) {
          const newTokens = await refreshToken();
          config.headers.Authorization = `Bearer ${newTokens.access}`;
        } else {
          config.headers.Authorization = `Bearer ${authTokens.access}`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const interval = setInterval(() => {
      checkTokenExpiration();
    }, 60000); // Verificar cada minuto

    return () => clearInterval(interval);
  }, [checkTokenExpiration]);

  useEffect(() => {
    checkTokenExpiration();
    setLoading(false);
  }, [checkTokenExpiration]);

  return (
    <AuthContext.Provider
      value={{
        authTokens,
        user,
        login,
        logout,
        loading,
        axiosInstance,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
