import express from 'express';
import { 
    registrarEscaneo,
    obtenerHistorial, 
    obtenerEscaneo, 
    eliminarEscaneo 
} from '../controllers/escaneosController.js';

const router = express.Router();

// Registrar un nuevo escaneo
router.post('/', registrarEscaneo);

// Obtener historial de escaneos de un usuario
router.get('/historial/:userId', obtenerHistorial);

// Obtener un escaneo específico
router.get('/:escaneoId', obtenerEscaneo);

// Eliminar un escaneo
router.delete('/:escaneoId', eliminarEscaneo);

export default router;