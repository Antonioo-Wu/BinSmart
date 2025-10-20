import mongoose from 'mongoose';

const residuoSchema = new mongoose.Schema({
  tipo: {
    type: String,
    required: true,
    trim: true
  },
  instruccionesReciclaje: {
    type: String,
    required: true
  },
  colorContenedor: {
    type: String,
    required: true,
    enum: ['verde', 'amarillo', 'azul', 'gris', 'marron', 'rojo']
  },
});

const Residuo = mongoose.model('Residuo', residuoSchema);

export default Residuo;