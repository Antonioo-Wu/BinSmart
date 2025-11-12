import axios from 'axios';

const baseURL = process.env.EXPO_PUBLIC_API_URL || 'https://binsmart.onrender.com';

export const classifyImage = async (image) => {
  const response = await axios.post(
    `${baseURL}/api/classification/classify`, 
    image
  );
  return response.data;
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
  console.log(response.data);
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
