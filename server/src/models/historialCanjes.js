import mongoose from 'mongoose';

const historialCanjesSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  puntosCanjeados: {
    type: Number,
    required: true
  },
  fechaCanje: {
    type: Date,
    default: Date.now
  },
  empresa: {
    type: String,
    required: true
  },
  producto_servicio: {
    type: String,
    required: true
  },
  codigo: {
    type: String,
    required: true,
    unique: true
  },
  usado: {
    type: Boolean,
    default: false
  }
});

historialCanjesSchema.index({ fechaClasificacion: -1 });

const HistorialCanjes = mongoose.model('HistorialCanjes', historialCanjesSchema);

export default HistorialCanjes; 