const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Middleware para validar userId
const validateUserId = (req, res, next) => {
  if (!req.body.userId) {
    return res.status(400).json({ 
      success: false, 
      message: 'El ID del usuario es requerido' 
    });
  }
  next();
};

// Crear nuevo libro
router.post('/', validateUserId, async (req, res) => {
  try {
    const { userId, title, author, isbn, entryDate, readingStatus, rating, review } = req.body;

    // Validar campos requeridos
    if (!title || !author || !entryDate || !readingStatus || !rating) {
      return res.status(400).json({ 
        success: false, 
        message: 'Todos los campos requeridos deben ser completados' 
      });
    }

    const newBook = new Book({
      userId,
      title,
      author,
      isbn: isbn || '',
      entryDate: new Date(entryDate),
      readingStatus,
      rating: parseInt(rating),
      review: review || ''
    });

    await newBook.save();

    res.status(201).json({ 
      success: true, 
      book: newBook 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error al crear libro', 
      error: error.message 
    });
  }
});

// Obtener todos los libros de un usuario
router.get('/user/:userId', async (req, res) => {
  try {
    const books = await Book.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });

    res.json({ 
      success: true, 
      books 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener libros', 
      error: error.message 
    });
  }
});

// Obtener un libro por ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({ 
        success: false, 
        message: 'Libro no encontrado' 
      });
    }

    res.json({ 
      success: true, 
      book 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener libro', 
      error: error.message 
    });
  }
});

// Actualizar un libro
router.put('/:id', async (req, res) => {
  try {
    const { title, author, isbn, entryDate, readingStatus, rating, review } = req.body;

    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({ 
        success: false, 
        message: 'Libro no encontrado' 
      });
    }

    // Actualizar campos
    if (title) book.title = title;
    if (author) book.author = author;
    if (isbn !== undefined) book.isbn = isbn;
    if (entryDate) book.entryDate = new Date(entryDate);
    if (readingStatus) book.readingStatus = readingStatus;
    if (rating) book.rating = parseInt(rating);
    if (review !== undefined) book.review = review;

    await book.save();

    res.json({ 
      success: true, 
      book 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error al actualizar libro', 
      error: error.message 
    });
  }
});

// Eliminar un libro
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    
    if (!book) {
      return res.status(404).json({ 
        success: false, 
        message: 'Libro no encontrado' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Libro eliminado exitosamente' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error al eliminar libro', 
      error: error.message 
    });
  }
});

module.exports = router;
