import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Usa jwtDecode como exportación nombrada

// Configuración de la API base
const api = axios.create({
  baseURL: "http://172.168.11.229:8000/api",
});

const isTokenExpired = (token) => {
  if (!token) return true;
  const decodedToken = jwtDecode(token); // Usa jwtDecode aquí
  const currentTime = Date.now() / 1000;
  return decodedToken.exp < currentTime; // Devuelve true si el token ha expirado
};

// Interceptor para verificar si el token ha expirado
api.interceptors.request.use(
  (config) => {
    const storedTokens = localStorage.getItem("tokens");
    if (storedTokens) {
      const { access } = JSON.parse(storedTokens);

      // Verifica si el token ha expirado antes de cada solicitud
      if (isTokenExpired(access)) {
        localStorage.removeItem("tokens"); // Elimina los tokens si están expirados
        window.location.href = "/login"; // Redirige al login
        throw new Error("Token expirado, redirigiendo al login...");
      }

      // Añade el token a las cabeceras si está activo
      config.headers["Authorization"] = `Bearer ${access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de respuesta para manejar errores 401 (Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("tokens"); // Elimina los tokens
      window.location.href = "/login"; // Redirige al login en caso de error 401
    }
    return Promise.reject(error);
  }
);

// Función de login para obtener y almacenar los tokens
export const login = async (username, password) => {
  try {
    const response = await api.post("/token/", { username, password });
    localStorage.setItem("tokens", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response.data);
    } else if (error.request) {
      console.error("Error request:", error.request);
    } else {
      console.error("Error", error.message);
    }
    throw error;
  }
};

// Funciones adicionales para interactuar con la API
export const fetchCamarasByDvr = async (dvrId) => {
  try {
    const response = await api.get(`/camaras/?dvr=${dvrId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching camaras:", error);
    throw error;
  }
};

export const fetchDvrs = async () => {
  try {
    const response = await api.get("/dvrs/");
    return response.data;
  } catch (error) {
    console.error("Error fetching DVRs:", error);
    throw error;
  }
};

export const createDvr = async (dvrData) => {
  try {
    const response = await api.post("/dvrs/", dvrData);
    return response.data;
  } catch (error) {
    console.error("Error creating DVR:", error);
    throw error;
  }
};

export const deleteDvr = async (dvrId) => {
  try {
    await api.delete(`/dvrs/${dvrId}/`);
  } catch (error) {
    console.error("Error deleting DVR:", error);
    throw error;
  }
};

export const fetchRegistros = async () => {
  try {
    const response = await api.get("/registros/");
    return response.data;
  } catch (error) {
    console.error("Error fetching registros:", error);
    throw error;
  }
};

export const createRegistro = async (registroData) => {
  try {
    const response = await api.post("/registros/", registroData);
    return response.data;
  } catch (error) {
    console.error("Error creating registro:", error);
    throw error;
  }
};

export const fetchCamaras = async () => {
  try {
    const response = await api.get("/camaras/");
    return response.data;
  } catch (error) {
    console.error("Error fetching camaras:", error);
    throw error;
  }
};

export const createCamara = async (camaraData) => {
  try {
    const response = await api.post("/camaras/", camaraData);
    return response.data;
  } catch (error) {
    console.error("Error creating camara:", error);
    throw error;
  }
};

export const deleteCamara = async (camaraId) => {
  try {
    await api.delete(`/camaras/${camaraId}/`);
  } catch (error) {
    console.error("Error deleting camara:", error);
    throw error;
  }
};

export default api;
