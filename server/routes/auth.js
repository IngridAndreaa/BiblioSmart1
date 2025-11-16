const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Login - Buscar usuario por email
router.post('/login', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'El email es requerido' 
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'Usuario no encontrado. Por favor, completa el registro primero.' 
      });
    }

    res.json({ 
      success: true, 
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        preferences: user.preferences,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error en el servidor', 
      error: error.message 
    });
  }
});

// Registro de nuevo usuario
router.post('/register', async (req, res) => {
  try {
    const { username, email, preferences } = req.body;

    // Validar campos requeridos
    if (!username || !email || !preferences) {
      return res.status(400).json({ 
        success: false, 
        message: 'Todos los campos son requeridos' 
      });
    }

    // Validar géneros
    if (!preferences.genres || preferences.genres.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Debes seleccionar al menos un género literario' 
      });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ 
        success: false, 
        message: 'Este email ya está registrado' 
      });
    }

    // Crear nuevo usuario
    const newUser = new User({
      username,
      email: email.toLowerCase(),
      preferences: {
        genres: preferences.genres,
        booksPerMonth: parseInt(preferences.booksPerMonth) || 0,
        favoriteAuthors: preferences.favoriteAuthors || [],
        readingFormat: preferences.readingFormat
      }
    });

    await newUser.save();

    res.status(201).json({ 
      success: true, 
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        preferences: newUser.preferences,
        createdAt: newUser.createdAt
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ 
        success: false, 
        message: 'Este email ya está registrado' 
      });
    }
    res.status(500).json({ 
      success: false, 
      message: 'Error al registrar usuario', 
      error: error.message 
    });
  }
});

// Obtener usuario por ID
router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'Usuario no encontrado' 
      });
    }

    res.json({ 
      success: true, 
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        preferences: user.preferences,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener usuario', 
      error: error.message 
    });
  }
});

module.exports = router;
