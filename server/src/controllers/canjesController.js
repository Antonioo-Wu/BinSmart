import HistorialCanjes from '../models/historialCanjes.js';
import Usuario from '../models/usuario.js';

// Función para generar código único de canje
const generarCodigoCanje = (empresa) => {
    const prefix = empresa.substring(0, 2).toUpperCase();
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `${prefix}-${code}`;
};

export const canje = async (req, res) => {
    const { userId } = req.params;
    const { puntosCanjeados, empresa, producto_servicio } = req.body;
    const usuario = await Usuario.findById(userId);
    if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    try {
        // Generar código único
        const codigo = generarCodigoCanje(empresa);

        const historialCanjes = new HistorialCanjes({ 
            usuario: userId, 
            puntosCanjeados, 
            empresa, 
            producto_servicio,
            codigo,
            usado: false
        });
        await historialCanjes.save();

        usuario.historialCanjes.push(historialCanjes._id);
        await usuario.save();
        res.json(historialCanjes);
    } catch (error) {
        console.error('Error al canjear:', error);
        res.status(500).json({ message: 'Error al canjear' });
    }
};

// Obtener historial de canjes de un usuario
export const obtenerCanjesUsuario = async (req, res) => {
    try {
        const { userId } = req.params;
        
        const canjes = await HistorialCanjes.find({ usuario: userId })
            .sort({ fechaCanje: -1 })
            .limit(100);

        res.json({
            success: true,
            count: canjes.length,
            data: canjes
        });
    } catch (error) {
        console.error('Error al obtener canjes:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error al obtener canjes',
            error: error.message 
        });
    }
};