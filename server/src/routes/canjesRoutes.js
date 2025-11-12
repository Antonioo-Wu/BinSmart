import { canje, obtenerCanjesUsuario } from "../controllers/canjesController.js";
import express from 'express';


const router = express.Router();    

router.post('/canje/:userId', canje);
router.get('/historial/:userId', obtenerCanjesUsuario);

export default router;