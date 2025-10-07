const huggingFaceService = require('../service/huggingfaceService');

class ClassificationController {
    async classifyImage(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No image file' });
            }
            
            const result = await huggingFaceService.classifyImage(req.file.buffer);
            res.json(result); 
        } catch (error) {
            console.error('Error in classification controller:', error);
            res.status(500).json({ 
                error: 'Internal server error',
                details: error.message 
            });
        }
    }
}

module.exports = new ClassificationController();