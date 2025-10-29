import express from 'express';
import { generateQrToken, validateQrToken } from '../controllers/qrController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Tablet solicita QR
router.get('/generate', generateQrToken);

// Celular valida QR
router.post('/validate', auth, validateQrToken);

export default router;