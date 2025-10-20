import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario.js';

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            throw new Error();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const usuario = await Usuario.findOne({ _id: decoded.userId });

        if (!usuario) {
            throw new Error();
        }

        req.token = token;
        req.usuario = usuario;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Por favor autentícate' });
    }
};

export default auth;
