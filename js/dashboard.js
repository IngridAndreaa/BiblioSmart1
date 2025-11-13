// Dashboard - Estadísticas

document.addEventListener('DOMContentLoaded', function() {
  updateDashboardStats();
});

function updateDashboardStats() {
  const books = getUserBooks();
  
  // Total de libros
  document.getElementById('totalBooks').textContent = books.length;
  
  // Calificación promedio
  if (books.length > 0) {
    const totalRating = books.reduce((sum, book) => sum + (book.rating || 0), 0);
    const avgRating = (totalRating / books.length).toFixed(1);
    document.getElementById('avgRating').textContent = avgRating;
  } else {
    document.getElementById('avgRating').textContent = '0.0';
  }
  
  // Libros leídos
  const readBooks = books.filter(book => book.readingStatus === 'Leído').length;
  document.getElementById('readBooks').textContent = readBooks;
}

