import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
const API_URL = 'http://127.0.0.1:8000/api';

// Crea una instancia de Axios para configurar la base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const isTokenExpired = (token) => {
  if (!token) return true;
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000; // Tiempo actual en segundos
  return decodedToken.exp < currentTime; // True si el token ha expirado
};


/*api.interceptors.request.use(
  (config) => {
    const storedTokens = localStorage.getItem('tokens');
    if (storedTokens) {
      const { access } = JSON.parse(storedTokens);
      config.headers['Authorization'] = `Bearer ${access}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);*/

api.interceptors.request.use(
  async (config) => {
    let storedTokens = localStorage.getItem('tokens');
    if (storedTokens) {
      let { access } = JSON.parse(storedTokens);

      // Verificar si el token ha expirado antes de cada solicitud
      if (isTokenExpired(access)) {
        try {
          access = await refreshAccessToken(); // Refrescar el token si ha expirado
        } catch (error) {
          console.error('Error refreshing access token', error);
          window.location.href = '/login'; // Redirigir al login si no se puede refrescar
          throw error;
        }
      }

      config.headers['Authorization'] = `Bearer ${access}`; // Agregar el token actualizado al encabezado
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Función para refrescar el token de acceso si ha expirado
/*const refreshAccessToken = async () => {
  try {
    const storedTokens = localStorage.getItem('tokens');
    if (!storedTokens) {
      throw new Error('No tokens found in localStorage');
    }

    const { refresh } = JSON.parse(storedTokens);
    
    if (!refresh) {
      throw new Error('No refresh token found');
    }

    const response = await axios.post(`${API_URL}/token/refresh/`, { refresh });

    // Actualiza el token de acceso en localStorage
    const newTokens = { access: response.data.access, refresh };
    localStorage.setItem('tokens', JSON.stringify(newTokens));

    return response.data.access;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    // Si no se puede refrescar el token, redirige al login
    localStorage.removeItem('tokens');  // Elimina los tokens inválidos
    window.location.href = '/login';
    throw error;
  }
};*/

const refreshAccessToken = async () => {
  try {
    const storedTokens = localStorage.getItem('tokens');
    if (!storedTokens) {
      throw new Error('No tokens found in localStorage');
    }

    const { refresh } = JSON.parse(storedTokens);
    
    if (!refresh) {
      throw new Error('No refresh token found');
    }

    const response = await axios.post(`${API_URL}/token/refresh/`, { refresh });

    // Actualiza el token de acceso en localStorage
    const newTokens = { access: response.data.access, refresh };
    localStorage.setItem('tokens', JSON.stringify(newTokens));

    return response.data.access;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    localStorage.removeItem('tokens'); // Elimina los tokens inválidos
    window.location.href = '/login';    // Redirige al login si no se puede refrescar
    throw error;
  }
};

// Interceptor de respuesta para manejar errores 401 (Unauthorized)
/*api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Si obtenemos un 401 y no hemos intentado ya refrescar el token
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest); // Reintenta la solicitud original con el nuevo token
      } catch (err) {
        console.error('Error during token refresh:', err);
        // Si falla la actualización del token, redirige al login
        window.location.href = '/login';
        return Promise.reject(error); 
      }
    }

    return Promise.reject(error);
  }
);*/

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Si obtenemos un 401 y no hemos intentado ya refrescar el token
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest); // Reintenta la solicitud original con el nuevo token
      } catch (err) {
        console.error('Error during token refresh:', err);
        window.location.href = '/login'; // Redirige al login si falla el refresco del token
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

// Función de login para obtener los tokens y almacenarlos
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/token/`, {
      username,
      password,
    });

    // Guarda los tokens en localStorage
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response.data);
    } else if (error.request) {
      console.error('Error request:', error.request);
    } else {
      console.error('Error', error.message);
    }
    throw error;
  }
};

export const fetchCamarasByDvr = async (dvrId) => {
  try {
    const response = await api.get(`/camaras/?dvr=${dvrId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching camaras:', error);
    throw error;
  }
};

// Función para obtener la lista de DVRs
export const fetchDvrs = async () => {
  try {
    const response = await api.get('/dvrs/');
    return response.data;
  } catch (error) {
    console.error('Error fetching DVRs:', error);
    throw error;
  }
};

// Función para crear un nuevo DVR
export const createDvr = async (dvrData) => {
  try {
    const response = await api.post('/dvrs/', dvrData);
    return response.data;
  } catch (error) {
    console.error('Error creating DVR:', error);
    throw error;
  }
};

// Función para eliminar DVR
export const deleteDvr = async (dvrId) => {
  try {
    await api.delete(`/dvrs/${dvrId}/`);
  } catch (error) {
    console.error('Error deleting DVR:', error);
    throw error;
  }
};

// Función para obtener registros
export const fetchRegistros = async () => {
  try {
    const response = await api.get('/registros/');
    return response.data;
  } catch (error) {
    console.error('Error fetching registros:', error);
    throw error;
  }
};

// Función para crear un registro
export const createRegistro = async (registroData) => {
  try {
    const response = await api.post('/registros/', registroData);
    return response.data;
  } catch (error) {
    console.error('Error creating registro:', error);
    throw error;
  }
};

// Función para obtener la lista de Cámaras
export const fetchCamaras = async () => {
  try {
    const response = await api.get('/camaras/');
    return response.data;
  } catch (error) {
    console.error('Error fetching camaras:', error);
    throw error;
  }
};

// Función para crear una nueva Cámara
export const createCamara = async (camaraData) => {
  try {
    const response = await api.post('/camaras/', camaraData);
    return response.data;
  } catch (error) {
    console.error('Error creating camara:', error);
    throw error;
  }
};

// Función para eliminar una Cámara
export const deleteCamara = async (camaraId) => {
  try {
    await api.delete(`/camaras/${camaraId}/`);
  } catch (error) {
    console.error('Error deleting camara:', error);
    throw error;
  }
};

export default api;

//Esta vida es una aventura, mucha magia, mucho misterio