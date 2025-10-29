import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

// Temp token
const qrTokens = {};

// Genera token unico
export const generateQrToken = (req, res) => {
    const qrToken = uuidv4();
    qrTokens[qrToken] = {
        createdAt: Date.now(),
        used: false
    };
    res.json({ qrToken });
};

export const validateQrToken = (req, res) => {
    const { qrToken } = req.body;
    const userId = req.userId;
    if (!qrToken || !qrTokens[qrToken]) {
        return res.status(400).json({ error: 'Token QR inválido o expirado' });
    }
    // 5m
    const now = Date.now();
    if (now - qrTokens[qrToken].createdAt > 5 * 60 * 1000) {
        delete qrTokens[qrToken];
        return res.status(400).json({ error: 'Token QR expirado' });
    }
    if (qrTokens[qrToken].used) {
        return res.status(400).json({ error: 'Token QR ya utilizado' });
    }
    qrTokens[qrToken].used = true;
    // JWT para la tablet
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
};


setInterval(() => {
    const now = Date.now();
    Object.keys(qrTokens).forEach(token => {
        if (now - qrTokens[token].createdAt > 5 * 60 * 1000) {
            delete qrTokens[token];
        }
    });
}, 60 * 1000);