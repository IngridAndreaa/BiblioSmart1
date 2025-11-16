const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'El nombre de usuario es requerido'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true,
    lowercase: true,
    trim: true
  },
  preferences: {
    genres: {
      type: [String],
      required: true
    },
    booksPerMonth: {
      type: Number,
      required: true,
      min: 0
    },
    favoriteAuthors: {
      type: [String],
      default: []
    },
    readingFormat: {
      type: String,
      required: true,
      enum: ['Físico', 'Digital', 'Audiolibro', 'Ambos']
    }
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
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('User', userSchema);
