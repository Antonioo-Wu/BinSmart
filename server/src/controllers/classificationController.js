import huggingFaceService from '../service/huggingfaceService.js';

class ClassificationController {
    async classifyImage(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No se proporcionó archivo de imagen' });
            }
            
            const result = await huggingFaceService.classifyImage(req.file.buffer);
            res.json(result); 
        } catch (error) {
            console.error('Error en controlador de clasificación:', error);
            res.status(500).json({ 
                error: 'Error interno del servidor',
                details: error.message 
            });
        }
    }
}

export default ClassificationController;