import express from 'express';
import { registro, login, getPerfil, asignPoints, discountPoints } from '../controllers/usuarioController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/registro', registro);
router.post('/login', login);

router.get('/perfil', auth, getPerfil);
router.post('/asignar-puntos/:userId', asignPoints);
router.post('/descontar-puntos/:userId', discountPoints);

export default router;