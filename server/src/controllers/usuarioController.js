import Usuario from '../models/usuario.js';
import jwt from 'jsonwebtoken';

// Crear un nuevo usuario
export const registro = async (req, res) => {
    try {
        console.log('Body recibido:', req.body);
        
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: 'No se recibieron datos',
                bodyRecibido: req.body
            });
        }

        const { nombre, email, password } = req.body;

        // Verificar si el usuario ya existe
        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            console.log('Intento de registro con email existente:', {
                emailIntentado: email,
                fechaIntento: new Date().toISOString()
            });
            return res.status(400).json({ 
                message: 'Error de registro',
                error: 'El email ya está registrado'
            });
        }

        // Crear nuevo usuario
        const usuario = new Usuario({
            nombre,
            email,
            password
        });

        await usuario.save();
        console.log('Usuario registrado correctamente:', usuario._id);

        // Generar token
        const token = jwt.sign(
            { userId: usuario._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: 'Usuario creado',
            token,
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email
            }
        });

    } catch (error) {
        console.error('Error en registro:', error);

        // Otros errores
        res.status(500).json({ message: 'Error al crear usuario' });
    }
};

// Log in
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar usuario
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Verificar password
        const isMatch = await usuario.comparePassword(password);
        if (!isMatch) {
            console.log("No iniciaste sesion")
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
        console.log("Iniciaste sesion")

        // Generar token
        const token = jwt.sign(
            { userId: usuario._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email
            }
        });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Obtener perfil de usuario
export const getPerfil = async (req, res) => {
    try {
        //TODO
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        console.log(usuario);
        res.json(usuario);
    } catch (error) {
        console.error('Error al obtener perfil:', error);
        res.status(500).json({ message: 'Error al obtener perfil' });
    }
};