import { Client } from '@gradio/client';
import fetch from 'node-fetch';
import FormData from 'form-data';

class HuggingFaceService {
    constructor() {
        this.client = null;
    }

    async getClient() {
        if (!this.client) {
            console.log('Conectando a Hugging Face...');
            this.client = await Client.connect("antonioowu/binsmart");
        }
        return this.client;
    }

    async classifyImageBuffer(imageBuffer) {
        try {
            const client = await this.getClient();
            const file = new Blob([imageBuffer], { type: 'image/jpeg' });
            
            console.log('Procesando imagen');
            const result = await client.predict("/predict", [
                file
            ]);
            
            console.log('Resultado:', result);
            if (!result) {
                throw new Error('No se recibió respuesta del modelo');
            }
            return result;
        } catch (error) {
            console.error('Error clasificando:', error);
            throw new Error(`Error al clasificar: ${error.message}`);
        }
    }

    async testClassification() {
        try {
            const response = await fetch("https://lh6.googleusercontent.com/YW5e9XHiGJzYRZITTqgnqIbM4geDX_L2nOyCTm3LlezSPYF7sqXPMxOZuMf8o_B7gtSwwEov6vdjryfqMR3KuswHz9CI9wgMnjIuhEOdxT0uaVNCOQzuBS68xeNw820dQU_Po_X_");
            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            
            console.log('Conectando a huggingface...');
            const client = await Client.connect("antonioowu/binsmart");

            const file = new Blob([buffer], { type: 'image/jpeg' });
            
            console.log('Procesando imagen');
            const result = await client.predict("/predict", [
                file 
            ]);
            
            console.log('Resultado:', result);
            if (!result) {
                throw new Error('No se recibió respuesta del modelo');
            }
            return result;
        } catch (error) {
            console.error('Error durante clasificación:', error);
            throw new Error(`Error en la clasificación: ${error.message}`);
        }
    }
}

export default HuggingFaceService;