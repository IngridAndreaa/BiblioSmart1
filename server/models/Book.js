const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El ID del usuario es requerido'],
    index: true
  },
  title: {
    type: String,
    required: [true, 'El título es requerido'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'El autor es requerido'],
    trim: true
  },
  isbn: {
    type: String,
    trim: true,
    default: ''
  },
  entryDate: {
    type: Date,
    required: [true, 'La fecha de ingreso es requerida']
  },
  readingStatus: {
    type: String,
    required: true,
    enum: ['Por leer', 'Leyendo', 'Leído', 'Abandonado']
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  review: {
    type: String,
    trim: true,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Actualizar updatedAt antes de guardar
bookSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Índice para búsquedas más rápidas
bookSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Book', bookSchema);
