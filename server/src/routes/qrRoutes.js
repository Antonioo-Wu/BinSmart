import express from 'express';
import { generateQrToken, validateQrToken } from '../controllers/qrController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/generate', auth, generateQrToken);

router.post('/validate', validateQrToken);

export default router;