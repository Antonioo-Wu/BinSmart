import express from 'express';
import { registro, login, getPerfil } from '../controllers/usuarioController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/registro', registro);
router.post('/login', login);

router.get('/perfil', auth, getPerfil);

export default router;