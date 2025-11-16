// Gestión de libros con API MongoDB

// Guardar libro
async function saveBook(bookData) {
  const user = getCurrentUser();
  if (!user) {
    alert('Debes iniciar sesión para registrar libros.');
    window.location.href = 'index.html';
    return false;
  }
  
  try {
    const response = await apiRequest('/books', {
      method: 'POST',
      body: JSON.stringify({
        userId: user.id,
        ...bookData
      })
    });
    
    return response.success;
  } catch (error) {
    console.error('Error al guardar libro:', error);
    alert('Error al guardar el libro: ' + error.message);
    return false;
  }
}

// Obtener libros del usuario
async function getUserBooks() {
  const user = getCurrentUser();
  if (!user) {
    return [];
  }
  
  try {
    const response = await apiRequest(`/books/user/${user.id}`);
    if (response.success) {
      // Convertir el formato de MongoDB al formato esperado por el frontend
      return response.books.map(book => ({
        id: book._id || book.id,
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        entryDate: book.entryDate ? new Date(book.entryDate).toISOString().split('T')[0] : book.entryDate,
        readingStatus: book.readingStatus,
        rating: book.rating,
        review: book.review,
        createdAt: book.createdAt,
        updatedAt: book.updatedAt
      }));
    }
    return [];
  } catch (error) {
    console.error('Error al obtener libros:', error);
    return [];
  }
}

// Actualizar libro
async function updateBook(bookId, bookData) {
  const user = getCurrentUser();
  if (!user) {
    return false;
  }
  
  try {
    const response = await apiRequest(`/books/${bookId}`, {
      method: 'PUT',
      body: JSON.stringify(bookData)
    });
    
    return response.success;
  } catch (error) {
    console.error('Error al actualizar libro:', error);
    alert('Error al actualizar el libro: ' + error.message);
    return false;
  }
}

// Eliminar libro
async function deleteBook(bookId) {
  const user = getCurrentUser();
  if (!user) {
    return false;
  }
  
  try {
    const response = await apiRequest(`/books/${bookId}`, {
      method: 'DELETE'
    });
    
    return response.success;
  } catch (error) {
    console.error('Error al eliminar libro:', error);
    alert('Error al eliminar el libro: ' + error.message);
    return false;
  }
}

// Obtener libro por ID
async function getBookById(bookId) {
  const user = getCurrentUser();
  if (!user) {
    return null;
  }
  
  try {
    const response = await apiRequest(`/books/${bookId}`);
    if (response.success && response.book) {
      const book = response.book;
      return {
        id: book._id || book.id,
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        entryDate: book.entryDate ? new Date(book.entryDate).toISOString().split('T')[0] : book.entryDate,
        readingStatus: book.readingStatus,
        rating: book.rating,
        review: book.review,
        createdAt: book.createdAt,
        updatedAt: book.updatedAt
      };
    }
    return null;
  } catch (error) {
    console.error('Error al obtener libro:', error);
    return null;
  }
}

// Manejar formulario de registro de libro
document.addEventListener('DOMContentLoaded', function() {
  const bookForm = document.getElementById('bookForm');
  if (bookForm) {
    bookForm.addEventListener('submit', async function(e) {
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
      
      const success = await saveBook(bookData);
      if (success) {
        alert('Libro registrado exitosamente.');
        window.location.href = 'view-books.html';
      } else {
        alert('Error al registrar el libro.');
      }
    });
  }
});

