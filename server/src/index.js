import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import classificationRoutes from './routes/classificationRoutes.js';
import qrRoutes from './routes/qrRoutes.js';
import canjesRoutes from './routes/canjesRoutes.js';
import escaneosRoutes from './routes/escaneosRoutes.js';

// Configuración de variables de entorno
dotenv.config();

// Conectar a MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a la API de BinSmart' });
});


// Rutas de la API
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/classification', classificationRoutes);
app.use('/api/qr', qrRoutes);
app.use('/api/canjes', canjesRoutes);
app.use('/api/escaneos', escaneosRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo salió mal!' });
});

// Puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});