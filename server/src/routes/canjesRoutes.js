import { canje } from "../controllers/canjesController.js";
import express from 'express';


const router = express.Router();    

router.post('/canje/:userId', canje);

export default router;