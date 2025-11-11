import Historial from '../models/historialEscaneos.js';

// Registrar un nuevo escaneo en el historial
export const registrarEscaneo = async (req, res) => {
    try {
        const { userId, imagenUrl, tipo, confianza } = req.body;

        if (!userId || !tipo || confianza === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Faltan datos requeridos: userId, tipo, confianza'
            });
        }

        const nuevoEscaneo = new Historial({
            usuario: userId,
            imagenUrl: imagenUrl || `scan_${Date.now()}.jpg`,
            resultadoClasificacion: {
                tipo: tipo,
                confianza: confianza
            }
        });

        await nuevoEscaneo.save();

        res.status(201).json({
            success: true,
            message: 'Escaneo registrado exitosamente',
            data: nuevoEscaneo
        });
    } catch (error) {
        console.error('Error al registrar escaneo:', error);
        res.status(500).json({
            success: false,
            message: 'Error al registrar escaneo',
            error: error.message
        });
    }
};

// Obtener historial de escaneos de un usuario
export const obtenerHistorial = async (req, res) => {
    try {
        const { userId } = req.params;
        
        const historial = await Historial.find({ usuario: userId })
            .sort({ fechaClasificacion: -1 })
            .limit(100); // Limitar a los últimos 100 escaneos

        res.json({
            success: true,
            count: historial.length,
            data: historial
        });
    } catch (error) {
        console.error('Error al obtener historial:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error al obtener historial',
            error: error.message 
        });
    }
};

// Obtener un escaneo específico
export const obtenerEscaneo = async (req, res) => {
    try {
        const { escaneoId } = req.params;
        
        const escaneo = await Historial.findById(escaneoId);
        
        if (!escaneo) {
            return res.status(404).json({ 
                success: false,
                message: 'Escaneo no encontrado' 
            });
        }

        res.json({
            success: true,
            data: escaneo
        });
    } catch (error) {
        console.error('Error al obtener escaneo:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error al obtener escaneo',
            error: error.message 
        });
    }
};

// Eliminar un escaneo del historial
export const eliminarEscaneo = async (req, res) => {
    try {
        const { escaneoId } = req.params;
        
        const escaneo = await Historial.findByIdAndDelete(escaneoId);
        
        if (!escaneo) {
            return res.status(404).json({ 
                success: false,
                message: 'Escaneo no encontrado' 
            });
        }

        res.json({
            success: true,
            message: 'Escaneo eliminado correctamente'
        });
    } catch (error) {
        console.error('Error al eliminar escaneo:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error al eliminar escaneo',
            error: error.message 
        });
    }
};