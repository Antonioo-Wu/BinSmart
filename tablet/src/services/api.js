import axios from 'axios';

// IMPORTANTE: Reemplaza la IP con la de tu computadora
// Para encontrar tu IP ejecuta en terminal: ifconfig | grep "inet " | grep -v 127.0.0.1
// Ejemplo: 'http://192.168.1.100:3000/api'
// 
// Opciones:
// - iOS Simulator: 'http://localhost:3000/api' (puede no funcionar siempre)
// - Dispositivo físico (mismo WiFi): 'http://TU_IP_AQUI:3000/api'
// - Android Emulator: 'http://10.0.2.2:3000/api'
const baseURL = process.env.EXPO_PUBLIC_API_URL || 'https://binsmart.onrender.com';

export const classifyImage = async (image) => {
  const response = await axios.post(`${baseURL}/api/classification/classify`, image);
  return response.data;
};

