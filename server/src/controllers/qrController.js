import { v4 as uuidv4 } from 'uuid';
import Usuario from '../models/usuario.js';
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

export const validateQrToken = async (req, res) => {
    console.log("Entro a validar el token")
    try {
        const { qrToken, sessionJwt } = req.body;

        console.log(qrToken, sessionJwt)

        if (!qrToken || !sessionJwt) {
            return res.status(400).json({ 
                success: false,
                error: 'Token QR y JWT son requeridos' 
            });
        }

        const tokenData = qrTokens[qrToken];
        if (!tokenData) {
            return res.status(404).json({ 
                success: false,
                error: 'Token QR no válido o expirado' 
            });
        }

        if (tokenData.used) {
            return res.status(400).json({ 
                success: false,
                error: 'Token QR ya fue utilizado' 
            });
        }

        const tokenAge = Date.now() - tokenData.createdAt;
        const FIVE_MINUTES = 5 * 60 * 1000;
        if (tokenAge > FIVE_MINUTES) {
            delete qrTokens[qrToken];
            return res.status(400).json({ 
                success: false,
                error: 'Token QR expirado' 
            });
        }

        let decodedJwt;
        try {
            decodedJwt = jwt.verify(sessionJwt, process.env.JWT_SECRET);
        } catch (error) {
            return res.status(401).json({ 
                success: false,
                error: 'JWT inválido' 
            });
        }

        if (decodedJwt.userId !== tokenData.ownerId.toString()) {
            return res.status(401).json({ 
                success: false,
                error: 'JWT no coincide con el token QR' 
            });
        }

        const usuario = await Usuario.findById(tokenData.ownerId).select('-password');
        if (!usuario) {
            return res.status(404).json({ 
                success: false,
                error: 'Usuario no encontrado' 
            });
        }

        qrTokens[qrToken].used = true;

        cleanExpiredTokens();

        console.log('✅ Login exitoso via QR para usuario:', usuario._id);

        res.json({
            success: true,
            message: 'Autenticación exitosa',
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email,
                puntos: usuario.puntos
            }
        });

    } catch (error) {
        console.error('Error validando token QR:', error);
        res.status(500).json({ 
            success: false,
            error: 'Error en el servidor' 
        });
    }
};

function cleanExpiredTokens() {
    const now = Date.now();
    const TEN_MINUTES = 10 * 60 * 1000;
    
    Object.keys(qrTokens).forEach(token => {
        if (now - qrTokens[token].createdAt > TEN_MINUTES) {
            delete qrTokens[token];
        }
    });
}
