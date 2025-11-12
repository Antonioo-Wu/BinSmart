import express from 'express';
import { 
    registro, 
    login, 
    getPerfil, 
    asignPoints, 
    discountPoints,
    updatePerfil,
    changePassword,
    deleteAccount,
    upgradeToPremiun
} from '../controllers/usuarioController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/registro', registro);
router.post('/login', login);

router.get('/perfil', auth, getPerfil);
router.put('/perfil', auth, updatePerfil);
router.put('/cambiar-password', auth, changePassword);
router.put('/mejorar-premium', auth, upgradeToPremiun);
router.delete('/eliminar-cuenta', auth, deleteAccount);

router.post('/asignar-puntos/:userId', asignPoints);
router.post('/descontar-puntos/:userId', discountPoints);

export default router;