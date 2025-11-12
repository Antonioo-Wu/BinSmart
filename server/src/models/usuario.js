import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /\S+@\S+\.\S+/.test(v);
      },
      message: props => `${props.value} no es un email válido`
    }
  },
  password: {
    type: String,
    required: [true, 'La contraseña es requerida'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
  },
  fechaRegistro: {
    type: Date,
    default: Date.now
  },
  telefono: {
    type: String,
    required: false,
    trim: true
  },
  puntos: {
    type: Number,
    default: 0
  },
  tipoSuscripcion: {
    type: String,
    enum: ['free', 'premium'],
    default: 'free'
  },
  historialCanjes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'HistorialCanjes',
    default: []
  }
});

// Hash 
usuarioSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

// Comparar
usuarioSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;