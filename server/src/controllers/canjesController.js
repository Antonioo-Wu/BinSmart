import HistorialCanjes from '../models/historialCanjes.js';
import Usuario from '../models/usuario.js';


export const canje = async (req, res) => {
    const { userId } = req.params;
    const { puntosCanjeados, empresa, producto_servicio } = req.body;
    const usuario = await Usuario.findById(userId);
    if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    try {
        const historialCanjes = new HistorialCanjes({ usuario: userId, puntosCanjeados, empresa, producto_servicio });
        await historialCanjes.save();

        usuario.historialCanjes.push(historialCanjes._id);
        await usuario.save();
        res.json(historialCanjes);
    } catch (error) {
        console.error('Error al canjear:', error);
        res.status(500).json({ message: 'Error al canjear' });
    }
}