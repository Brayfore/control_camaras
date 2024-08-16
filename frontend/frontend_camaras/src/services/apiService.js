import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

// Crea una instancia de Axios para configurar la base URL si es necesario
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para obtener la lista de DVRs
export const fetchDvrs = async () => {
  try {
    const response = await api.get('/dvrs/');
    console.log(response);
    
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

//Función para Eliminar Dvr
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

export const createRegistro = async (registroData) => {
  try {
    const response = await api.post('/registros/', registroData);
    return response.data;
  } catch (error) {
    console.error('Error creating registro:', error);
    throw error;
  }
};

export default api;
