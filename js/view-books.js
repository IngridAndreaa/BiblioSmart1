// Ver y editar libros

let allBooks = [];

document.addEventListener('DOMContentLoaded', function() {
  loadBooks();
  
  // Búsqueda de libros
  const searchInput = document.getElementById('searchBooks');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      filterBooks(this.value);
    });
  }
  
  // Configurar estrellas de edición
  setupEditStars();
});

async function loadBooks() {
  allBooks = await getUserBooks();
  displayBooks(allBooks);
}

function displayBooks(books) {
  const booksList = document.getElementById('booksList');
  
  if (books.length === 0) {
    booksList.innerHTML = `
      <div class="empty-state">
        <i class="bi bi-book-x"></i>
        <h3>No tienes libros registrados</h3>
        <p>Comienza agregando tu primer libro a tu biblioteca.</p>
        <a href="register-book.html" class="btn btn-primary">
          <i class="bi bi-plus-circle"></i> Registrar Primer Libro
        </a>
      </div>
    `;
    return;
  }
  
  booksList.innerHTML = books.map(book => `
    <div class="book-card">
      <div class="row">
        <div class="col-md-8">
          <h4>${escapeHtml(book.title)}</h4>
          <p class="text-muted mb-2">
            <strong>Autor:</strong> ${escapeHtml(book.author)}
          </p>
          ${book.isbn ? `<p class="text-muted mb-2"><strong>ISBN:</strong> ${escapeHtml(book.isbn)}</p>` : ''}
          <p class="text-muted mb-2">
            <strong>Fecha de Ingreso:</strong> ${formatDate(book.entryDate)}
          </p>
          <span class="badge bg-${getStatusColor(book.readingStatus)} status-badge mb-2">
            ${escapeHtml(book.readingStatus)}
          </span>
          <div class="star-rating-display mb-2">
            ${generateStars(book.rating)}
          </div>
          ${book.review ? `
            <div class="mt-2">
              <strong>Reseña:</strong>
              <p class="mt-1">${escapeHtml(book.review)}</p>
            </div>
          ` : ''}
        </div>
        <div class="col-md-4 text-md-end">
          <button class="btn btn-primary mb-2" onclick="editBook('${book.id}')">
            <i class="bi bi-pencil"></i> Editar
          </button>
          <button class="btn btn-danger" onclick="deleteBookConfirm('${book.id}')">
            <i class="bi bi-trash"></i> Eliminar
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function filterBooks(searchTerm) {
  const filtered = allBooks.filter(book => {
    const term = searchTerm.toLowerCase();
    return book.title.toLowerCase().includes(term) ||
           book.author.toLowerCase().includes(term) ||
           (book.isbn && book.isbn.toLowerCase().includes(term));
  });
  displayBooks(filtered);
}

async function editBook(bookId) {
  const book = await getBookById(bookId);
  if (!book) {
    alert('Libro no encontrado.');
    return;
  }
  
  // Llenar formulario de edición
  document.getElementById('editBookId').value = book.id;
  document.getElementById('editTitle').value = book.title;
  document.getElementById('editAuthor').value = book.author;
  document.getElementById('editIsbn').value = book.isbn || '';
  document.getElementById('editEntryDate').value = book.entryDate;
  document.getElementById('editReadingStatus').value = book.readingStatus;
  document.getElementById('editRating').value = book.rating;
  document.getElementById('editReview').value = book.review || '';
  
  // Mostrar modal
  const modalElement = document.getElementById('editBookModal');
  const modal = new bootstrap.Modal(modalElement);
  
  // Actualizar estrellas cuando el modal esté completamente visible
  const updateStarsHandler = function() {
    updateEditStars(book.rating);
    modalElement.removeEventListener('shown.bs.modal', updateStarsHandler);
  };
  modalElement.addEventListener('shown.bs.modal', updateStarsHandler);
  
  modal.show();
}

async function saveBookEdit() {
  const bookId = document.getElementById('editBookId').value;
  const title = document.getElementById('editTitle').value;
  const author = document.getElementById('editAuthor').value;
  const isbn = document.getElementById('editIsbn').value;
  const entryDate = document.getElementById('editEntryDate').value;
  const readingStatus = document.getElementById('editReadingStatus').value;
  const rating = parseInt(document.getElementById('editRating').value);
  const review = document.getElementById('editReview').value;
  
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
  
  const success = await updateBook(bookId, bookData);
  if (success) {
    alert('Libro actualizado exitosamente.');
    const modal = bootstrap.Modal.getInstance(document.getElementById('editBookModal'));
    modal.hide();
    loadBooks();
  } else {
    alert('Error al actualizar el libro.');
  }
}

async function deleteBookConfirm(bookId) {
  const book = await getBookById(bookId);
  if (!book) {
    return;
  }
  
  if (confirm(`¿Estás seguro de que deseas eliminar "${book.title}"?`)) {
    const success = await deleteBook(bookId);
    if (success) {
      alert('Libro eliminado exitosamente.');
      loadBooks();
    } else {
      alert('Error al eliminar el libro.');
    }
  }
}

function setupEditStars() {
  // Configurar estrellas cuando el modal se muestra
  const modalElement = document.getElementById('editBookModal');
  if (modalElement) {
    modalElement.addEventListener('shown.bs.modal', function() {
      const stars = document.querySelectorAll('#editStarRating .star');
      const ratingInput = document.getElementById('editRating');
      const starRatingContainer = document.getElementById('editStarRating');
      
      if (!stars || stars.length === 0) return;
      
      // Agregar listeners a las estrellas
      stars.forEach(star => {
        // Remover listeners anteriores
        const newStar = star.cloneNode(true);
        star.parentNode.replaceChild(newStar, star);
      });
      
      // Obtener las nuevas estrellas
      const newStars = document.querySelectorAll('#editStarRating .star');
      
      newStars.forEach(star => {
        star.addEventListener('click', function() {
          const rating = parseInt(this.getAttribute('data-rating'));
          ratingInput.value = rating;
          updateEditStars(rating);
        });
        
        star.addEventListener('mouseenter', function() {
          const rating = parseInt(this.getAttribute('data-rating'));
          newStars.forEach((s, idx) => {
            if (idx < rating) {
              s.style.color = '#ffc107';
            } else {
              s.style.color = '#ddd';
            }
          });
        });
      });
      
      // Resetear al salir del hover
      if (starRatingContainer) {
        starRatingContainer.addEventListener('mouseleave', function() {
          const currentRating = parseInt(ratingInput.value) || 0;
          newStars.forEach((s, idx) => {
            if (idx < currentRating) {
              s.style.color = '#ffc107';
            } else {
              s.style.color = '#ddd';
            }
          });
        });
      }
    });
  }
}

function updateEditStars(rating) {
  const stars = document.querySelectorAll('#editStarRating .star');
  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.add('active');
      star.textContent = '★';
      star.style.color = '#ffc107';
    } else {
      star.classList.remove('active');
      star.textContent = '☆';
      star.style.color = '#ddd';
    }
  });
}

function generateStars(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars += '★';
    } else {
      stars += '☆';
    }
  }
  return stars;
}

function getStatusColor(status) {
  const colors = {
    'Por leer': 'secondary',
    'Leyendo': 'info',
    'Leído': 'success',
    'Abandonado': 'danger'
  };
  return colors[status] || 'secondary';
}

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text ? text.replace(/[&<>"']/g, m => map[m]) : '';
}

