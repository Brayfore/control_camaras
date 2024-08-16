import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => 
    localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens')) : null
  );

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/', { username, password });
      setAuthTokens(response.data);
      localStorage.setItem('tokens', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error during login', error);
      throw error;
    }
  };

  const logout = () => {
    setAuthTokens(null);
    localStorage.removeItem('tokens');
  };

  return (
    <AuthContext.Provider value={{ authTokens, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
