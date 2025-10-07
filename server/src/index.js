const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Configuración de variables de entorno
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a la API de BinSmart' });
});

// Rutas de clasificación
const classificationRoutes = require('./routes/classificationRoutes');
app.use('/api/classification', classificationRoutes);

// Puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});