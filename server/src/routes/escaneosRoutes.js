import express from 'express';
import { 
    registrarEscaneo,
    obtenerHistorial, 
    obtenerEscaneos,
    obtenerEscaneo, 
    eliminarEscaneo 
} from '../controllers/escaneosController.js';

const router = express.Router();

router.post('/', registrarEscaneo);

router.get('/', obtenerEscaneos);

router.get('/historial/:userId', obtenerHistorial);

router.get('/:escaneoId', obtenerEscaneo);

router.delete('/:escaneoId', eliminarEscaneo);

export default router;