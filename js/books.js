// Gestión de libros

// Guardar libro
function saveBook(bookData) {
  const user = getCurrentUser();
  if (!user) {
    alert('Debes iniciar sesión para registrar libros.');
    window.location.href = 'index.html';
    return false;
  }
  
  const books = JSON.parse(localStorage.getItem('books') || '{}');
  if (!books[user.id]) {
    books[user.id] = [];
  }
  
  const newBook = {
    id: Date.now().toString(),
    ...bookData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  books[user.id].push(newBook);
  localStorage.setItem('books', JSON.stringify(books));
  
  return true;
}

// Obtener libros del usuario
function getUserBooks() {
  const user = getCurrentUser();
  if (!user) {
    return [];
  }
  
  const books = JSON.parse(localStorage.getItem('books') || '{}');
  return books[user.id] || [];
}

// Actualizar libro
function updateBook(bookId, bookData) {
  const user = getCurrentUser();
  if (!user) {
    return false;
  }
  
  const books = JSON.parse(localStorage.getItem('books') || '{}');
  if (!books[user.id]) {
    return false;
  }
  
  const bookIndex = books[user.id].findIndex(b => b.id === bookId);
  if (bookIndex === -1) {
    return false;
  }
  
  books[user.id][bookIndex] = {
    ...books[user.id][bookIndex],
    ...bookData,
    updatedAt: new Date().toISOString()
  };
  
  localStorage.setItem('books', JSON.stringify(books));
  return true;
}

// Eliminar libro
function deleteBook(bookId) {
  const user = getCurrentUser();
  if (!user) {
    return false;
  }
  
  const books = JSON.parse(localStorage.getItem('books') || '{}');
  if (!books[user.id]) {
    return false;
  }
  
  books[user.id] = books[user.id].filter(b => b.id !== bookId);
  localStorage.setItem('books', JSON.stringify(books));
  return true;
}

// Obtener libro por ID
function getBookById(bookId) {
  const user = getCurrentUser();
  if (!user) {
    return null;
  }
  
  const books = JSON.parse(localStorage.getItem('books') || '{}');
  if (!books[user.id]) {
    return null;
  }
  
  return books[user.id].find(b => b.id === bookId) || null;
}

// Manejar formulario de registro de libro
document.addEventListener('DOMContentLoaded', function() {
  const bookForm = document.getElementById('bookForm');
  if (bookForm) {
    bookForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const user = getCurrentUser();
      if (!user) {
        alert('Debes iniciar sesión para registrar libros.');
        window.location.href = 'index.html';
        return;
      }
      
      const title = document.getElementById('title').value;
      const author = document.getElementById('author').value;
      const isbn = document.getElementById('isbn').value;
      const entryDate = document.getElementById('entryDate').value;
      const readingStatus = document.getElementById('readingStatus').value;
      const rating = parseInt(document.getElementById('rating').value);
      const review = document.getElementById('review').value;
      
      if (rating === 0) {
        alert('Por favor, califica el libro con estrellas.');
        return;
      }
      
      const bookData = {
        title,
        author,
        isbn,
        entryDate,
        readingStatus,
        rating,
        review
      };
      
      if (saveBook(bookData)) {
        alert('Libro registrado exitosamente.');
        window.location.href = 'view-books.html';
      } else {
        alert('Error al registrar el libro.');
      }
    });
  }
});

