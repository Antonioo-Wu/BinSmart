import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

const qrTokens = {};

export const generateQrToken = (req, res) => {
    const userId = req.usuario?._id || req.userId;
    if (!userId) {
        return res.status(401).json({ error: 'No autorizado' });
    }
    const qrToken = uuidv4();
    qrTokens[qrToken] = {
        createdAt: Date.now(),
        used: false,
        ownerId: userId
    };

    const sessionJwt = req.token;
    res.json({ qrToken, sessionJwt });
};
