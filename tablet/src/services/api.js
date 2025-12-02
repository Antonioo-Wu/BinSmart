import axios from 'axios';

const baseURL = process.env.EXPO_PUBLIC_API_URL || 'https://binsmart.onrender.com';

// Configurar timeout para axios
axios.defaults.timeout = 30000; // 30 segundos

// Función para despertar el servidor (Render free tier)
const wakeUpServer = async () => {
  try {
    const response = await axios.get(`${baseURL}`, { timeout: 15000 });
    return true;
  } catch (error) {
    return false;
  }
};

export const classifyImage = async (image) => {
  try {
    // Despertar el servidor antes de la clasificación
    await wakeUpServer();
    
    const response = await axios.post(
      `${baseURL}/api/classification/classify`, 
      image,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 60000, // 60 segundos para dar tiempo al modelo de IA
      }
    );
    
    return response.data;
  } catch (error) {
    
    // Re-lanzar el error con más información
    if (error.code === 'NETWORK_ERROR') {
      throw new Error(`Sin conexión a internet o servidor no disponible. Verifica tu conexión.`);
    } else if (error.code === 'ECONNABORTED') {
      throw new Error(`Timeout: El servidor tardó demasiado en responder (${error.config?.timeout/1000}s)`);
    } else {
      throw new Error(`Error de red: ${error.message}. Servidor: ${baseURL}`);
    }
  }
};

export const registrarEscaneo = async (userId, tipo, confianza, imagenUrl = null) => {
  const response = await axios.post(`${baseURL}/api/escaneos`, {
    userId,
    tipo,
    confianza,
    imagenUrl
  });
  return response.data;
};

export const obtenerHistorial = async (userId) => {
  const response = await axios.get(`${baseURL}/api/escaneos/historial/${userId}`);
  return response.data;
};

export const obtenerTodosLosEscaneos = async () => {
  const response = await axios.get(`${baseURL}/api/escaneos`);
  return response.data;
};

export const obtenerEscaneo = async (escaneoId) => {
  const response = await axios.get(`${baseURL}/api/escaneos/${escaneoId}`);
  return response.data;
};

export const eliminarEscaneo = async (escaneoId) => {
  const response = await axios.delete(`${baseURL}/api/escaneos/${escaneoId}`);
  return response.data;
};

// Validar token QR
export const validateQrToken = async (qrToken, sessionJwt) => {
  const response = await axios.post(`${baseURL}/api/qr/validate`, {
    qrToken,
    sessionJwt
  });
  return response.data;
};

export const asignarPuntos = async (userId, points) => {
  console.log(`📡 Enviando petición de puntos: URL=${baseURL}/api/usuarios/asignar-puntos/${userId}, points=${points}`);
  try {
    const response = await axios.post(`${baseURL}/api/usuarios/asignar-puntos/${userId}`, {
      points
    });
    console.log(`📡 Respuesta del servidor:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`📡 Error en petición de puntos:`, error.response?.data || error.message);
    throw error;
  }
};
