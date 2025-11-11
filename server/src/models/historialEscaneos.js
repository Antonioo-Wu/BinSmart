import mongoose from 'mongoose';

const historialSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  imagenUrl: {
    type: String,
    required: true
  },
  resultadoClasificacion: {
    tipo: {
      type: String,
      required: true
    },
    confianza: {
      type: Number,
      required: true
    }
  },
  fechaClasificacion: {
    type: Date,
    default: Date.now
  },
});

historialSchema.index({ fechaClasificacion: -1 });

const Historial = mongoose.model('Historial_escaneos', historialSchema);

export default Historial;