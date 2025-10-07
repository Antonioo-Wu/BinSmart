const express = require('express');
const multer = require('multer');
const classificationController = require('../controllers/classificationController');
const huggingFaceService = require('../service/huggingfaceService');

const router = express.Router();
const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
}).single('image');

// clasificar
router.post('/classify', async (req, res) => {
    upload(req, res, async function(err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: `Error al subir el archivo: ${err.message}` });
        } else if (err) {
            return res.status(500).json({ error: `Error desconocido: ${err.message}` });
        }

        try {
            if (!req.file) {
                return res.status(400).json({ 
                    error: 'No se proporcionó ninguna imagen',
                    details: 'Debes enviar una imagen en el campo "image"'
                });
            }

            console.log('Procesando imagen:', req.file.originalname);
            const result = await huggingFaceService.classifyImageBuffer(req.file.buffer);
            res.json(result);
        } catch (error) {
            console.error('Error procesando la imagen:', error);
            res.status(500).json({ error: error.message });
        }
    });
});

// Test
router.get('/test', async (req, res) => {
    try {
        const result = await huggingFaceService.testClassification();
        res.json(result);
    } catch (error) {
        console.error('Error in test route:', error);
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;