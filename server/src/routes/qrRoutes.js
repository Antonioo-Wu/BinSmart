import express from 'express';
import { generateQrToken } from '../controllers/qrController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/generate', auth, generateQrToken);

export default router;