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
        const usuario = await Usuario.findById(req.usuario._id).select('-password');
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        console.error('Error al obtener perfil:', error);
        res.status(500).json({ message: 'Error al obtener perfil' });
    }
};

// Sumarle puntos al usuario
export const asignPoints = async (req, res) => {
    try {
        const { userId } = req.params;
        const { points } = req.body;
        
        const usuario = await Usuario.findById(userId);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        
        // Calcular nuevos puntos
        const nuevosPuntos = usuario.puntos + points;
        
        // Aplicar límite de 5000 para cuentas Free
        if (usuario.tipoSuscripcion === 'free') {
            usuario.puntos = Math.min(nuevosPuntos, 5000);
            
            if (nuevosPuntos > 5000) {
                return res.json({ 
                    message: 'Límite de puntos alcanzado (5000). Mejora a Premium para puntos ilimitados.',
                    usuario,
                    limitAlcanzado: true
                });
            }
        } else {
            // Premium: puntos ilimitados
            usuario.puntos = nuevosPuntos;
        }
        
        await usuario.save();
        res.json({ message: 'Puntos asignados correctamente', usuario, limitAlcanzado: false });
    } catch (error) {
        console.error('Error al asignar puntos:', error);
        res.status(500).json({ message: 'Error al asignar puntos' });
    }
}

export const discountPoints = async (req, res) => {
    try {
        const { userId } = req.params;
        const { points } = req.body;
        const usuario = await Usuario.findById(userId);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        usuario.puntos -= points;
        await usuario.save();
        res.json({ message: 'Puntos descontados correctamente', usuario });
    } catch (error) {
        console.error('Error al descontar puntos:', error);
        res.status(500).json({ message: 'Error al descontar puntos' });
    }
};

// Actualizar perfil de usuario
export const updatePerfil = async (req, res) => {
    try {
        const { nombre, email, telefono } = req.body;
        const userId = req.usuario.id;

        // Validaciones
        if (!nombre || !email) {
            return res.status(400).json({ 
                message: 'Nombre y email son obligatorios' 
            });
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                message: 'Formato de email inválido' 
            });
        }

        // Verificar si el email ya existe en otro usuario
        const emailExistente = await Usuario.findOne({ 
            email, 
            _id: { $ne: userId } 
        });
        if (emailExistente) {
            return res.status(400).json({ 
                message: 'El email ya está en uso por otro usuario' 
            });
        }

        // Actualizar usuario
        const usuario = await Usuario.findByIdAndUpdate(
            userId,
            { 
                nombre, 
                email,
                ...(telefono && { telefono })
            },
            { new: true, runValidators: true }
        ).select('-password');

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json({
            message: 'Perfil actualizado correctamente',
            usuario
        });
    } catch (error) {
        console.error('Error al actualizar perfil:', error);
        res.status(500).json({ message: 'Error al actualizar perfil' });
    }
};

// Cambiar contraseña
export const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.usuario.id;

        // Validaciones
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ 
                message: 'Debes proporcionar la contraseña actual y la nueva' 
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ 
                message: 'La nueva contraseña debe tener al menos 6 caracteres' 
            });
        }

        // Buscar usuario
        const usuario = await Usuario.findById(userId);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar contraseña actual
        const isMatch = await usuario.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(401).json({ 
                message: 'La contraseña actual es incorrecta' 
            });
        }

        // Actualizar contraseña (el hash se hace automáticamente en el pre-save)
        usuario.password = newPassword;
        await usuario.save();

        res.json({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
        console.error('Error al cambiar contraseña:', error);
        res.status(500).json({ message: 'Error al cambiar contraseña' });
    }
};

// Eliminar cuenta
export const deleteAccount = async (req, res) => {
    try {
        const { password } = req.body;
        const userId = req.usuario.id;

        // Validación
        if (!password) {
            return res.status(400).json({ 
                message: 'Debes proporcionar tu contraseña para confirmar' 
            });
        }

        // Buscar usuario
        const usuario = await Usuario.findById(userId);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar contraseña
        const isMatch = await usuario.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ 
                message: 'Contraseña incorrecta' 
            });
        }

        // Eliminar usuario
        await Usuario.findByIdAndDelete(userId);

        res.json({ 
            message: 'Cuenta eliminada correctamente' 
        });
    } catch (error) {
        console.error('Error al eliminar cuenta:', error);
        res.status(500).json({ message: 'Error al eliminar cuenta' });
    }
};

// Mejorar a Premium
export const upgradeToPremiun = async (req, res) => {
    try {
        const userId = req.usuario.id;
        const { cardNumber, cardName, cvv, expiryDate } = req.body;

        // Validación (en producción aquí iría la integración con procesador de pagos)
        if (!cardNumber || !cardName || !cvv || !expiryDate) {
            return res.status(400).json({ 
                message: 'Todos los datos de la tarjeta son requeridos' 
            });
        }

        // Buscar usuario
        const usuario = await Usuario.findById(userId);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar si ya es premium
        if (usuario.tipoSuscripcion === 'premium') {
            return res.status(400).json({ 
                message: 'Ya tienes una suscripción Premium activa' 
            });
        }

        // Actualizar a premium (simulamos que el pago siempre es exitoso)
        usuario.tipoSuscripcion = 'premium';
        await usuario.save();

        // Devolver usuario sin password
        const usuarioSinPassword = usuario.toObject();
        delete usuarioSinPassword.password;

        res.json({ 
            message: '¡Felicidades! Ahora eres miembro Premium',
            usuario: usuarioSinPassword
        });
    } catch (error) {
        console.error('Error al mejorar a premium:', error);
        res.status(500).json({ message: 'Error al procesar la actualización' });
    }
};