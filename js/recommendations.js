// Recomendaciones por IA (simuladas)

// Base de datos de libros populares para recomendaciones
const bookDatabase = [
  { title: 'Cien años de soledad', author: 'Gabriel García Márquez', genre: 'Realismo mágico', rating: 4.8 },
  { title: 'El amor en los tiempos del cólera', author: 'Gabriel García Márquez', genre: 'Romance', rating: 4.6 },
  { title: '1984', author: 'George Orwell', genre: 'Ciencia Ficción', rating: 4.7 },
  { title: 'El señor de los anillos', author: 'J.R.R. Tolkien', genre: 'Fantasía', rating: 4.9 },
  { title: 'Harry Potter y la piedra filosofal', author: 'J.K. Rowling', genre: 'Fantasía', rating: 4.8 },
  { title: 'Orgullo y prejuicio', author: 'Jane Austen', genre: 'Romance', rating: 4.5 },
  { title: 'Crónica de una muerte anunciada', author: 'Gabriel García Márquez', genre: 'Misterio', rating: 4.4 },
  { title: 'El código Da Vinci', author: 'Dan Brown', genre: 'Misterio', rating: 4.2 },
  { title: 'La sombra del viento', author: 'Carlos Ruiz Zafón', genre: 'Misterio', rating: 4.6 },
  { title: 'Sapiens', author: 'Yuval Noah Harari', genre: 'No Ficción', rating: 4.7 },
  { title: 'El hombre en busca de sentido', author: 'Viktor Frankl', genre: 'No Ficción', rating: 4.8 },
  { title: 'Steve Jobs', author: 'Walter Isaacson', genre: 'Biografía', rating: 4.5 },
  { title: 'Dune', author: 'Frank Herbert', genre: 'Ciencia Ficción', rating: 4.6 },
  { title: 'Fundación', author: 'Isaac Asimov', genre: 'Ciencia Ficción', rating: 4.7 },
  { title: 'El nombre del viento', author: 'Patrick Rothfuss', genre: 'Fantasía', rating: 4.6 },
  { title: 'Los pilares de la tierra', author: 'Ken Follett', genre: 'Historia', rating: 4.5 },
  { title: 'La casa de los espíritus', author: 'Isabel Allende', genre: 'Realismo mágico', rating: 4.6 },
  { title: 'Paula', author: 'Isabel Allende', genre: 'Biografía', rating: 4.5 },
  { title: 'El psicoanalista', author: 'John Katzenbach', genre: 'Suspenso', rating: 4.3 },
  { title: 'El silencio de los corderos', author: 'Thomas Harris', genre: 'Suspenso', rating: 4.6 }
];

document.addEventListener('DOMContentLoaded', function() {
  generateRecommendations();
});

function generateRecommendations() {
  const user = getCurrentUser();
  if (!user) {
    document.getElementById('recommendationsList').innerHTML = `
      <div class="empty-state">
        <p>Debes iniciar sesión para ver recomendaciones.</p>
      </div>
    `;
    return;
  }
  
  // Mostrar loading
  document.getElementById('recommendationsList').innerHTML = `
    <div class="loading-spinner">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
      <p class="mt-3">Analizando tus preferencias y generando recomendaciones personalizadas...</p>
    </div>
  `;
  
  // Simular procesamiento de IA
  setTimeout(() => {
    const recommendations = getRecommendations(user);
    displayRecommendations(recommendations);
  }, 1500);
}

function getRecommendations(user) {
  const userBooks = getUserBooks();
  const userGenres = user.preferences.genres || [];
  const favoriteAuthors = user.preferences.favoriteAuthors || [];
  
  // Obtener títulos de libros que el usuario ya tiene
  const userBookTitles = userBooks.map(book => book.title.toLowerCase());
  
  // Filtrar libros por géneros preferidos
  let recommendations = bookDatabase.filter(book => {
    // No recomendar libros que el usuario ya tiene
    if (userBookTitles.includes(book.title.toLowerCase())) {
      return false;
    }
    
    // Filtrar por géneros preferidos
    if (userGenres.length > 0) {
      return userGenres.some(genre => 
        book.genre.toLowerCase().includes(genre.toLowerCase()) ||
        genre.toLowerCase().includes(book.genre.toLowerCase())
      );
    }
    
    return true;
  });
  
  // Si hay autores favoritos, priorizar libros de esos autores
  if (favoriteAuthors.length > 0) {
    const authorBooks = recommendations.filter(book => 
      favoriteAuthors.some(author => 
        book.author.toLowerCase().includes(author.toLowerCase()) ||
        author.toLowerCase().includes(book.author.toLowerCase())
      )
    );
    
    if (authorBooks.length > 0) {
      recommendations = [...authorBooks, ...recommendations.filter(b => !authorBooks.includes(b))];
    }
  }
  
  // Ordenar por rating y limitar a 6 recomendaciones
  recommendations = recommendations
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);
  
  // Si no hay suficientes recomendaciones, agregar libros populares
  if (recommendations.length < 6) {
    const popularBooks = bookDatabase
      .filter(book => !userBookTitles.includes(book.title.toLowerCase()))
      .filter(book => !recommendations.includes(book))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6 - recommendations.length);
    
    recommendations = [...recommendations, ...popularBooks];
  }
  
  return recommendations;
}

function displayRecommendations(recommendations) {
  const recommendationsList = document.getElementById('recommendationsList');
  
  if (recommendations.length === 0) {
    recommendationsList.innerHTML = `
      <div class="empty-state">
        <i class="bi bi-info-circle"></i>
        <h3>No hay recomendaciones disponibles</h3>
        <p>Completa tus preferencias literarias para obtener recomendaciones personalizadas.</p>
      </div>
    `;
    return;
  }
  
  recommendationsList.innerHTML = recommendations.map(book => `
    <div class="recommendation-card">
      <span class="ai-badge">
        <i class="bi bi-robot"></i> Recomendado por IA
      </span>
      <h4>${escapeHtml(book.title)}</h4>
      <p class="text-muted mb-2">
        <strong>Autor:</strong> ${escapeHtml(book.author)}
      </p>
      <p class="mb-2">
        <strong>Género:</strong> ${escapeHtml(book.genre)}
      </p>
      <div class="star-rating-display mb-3">
        ${generateStars(Math.round(book.rating))}
        <span class="text-muted ms-2">${book.rating.toFixed(1)}</span>
      </div>
      <button class="btn btn-primary" onclick="addRecommendedBook('${escapeHtml(book.title)}', '${escapeHtml(book.author)}', '${escapeHtml(book.genre)}')">
        <i class="bi bi-plus-circle"></i> Agregar a mi Biblioteca
      </button>
    </div>
  `).join('');
}

function addRecommendedBook(title, author, genre) {
  // Redirigir a la página de registro con datos prellenados
  const params = new URLSearchParams({
    title: encodeURIComponent(title),
    author: encodeURIComponent(author),
    genre: encodeURIComponent(genre)
  });
  window.location.href = `register-book.html?${params.toString()}`;
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

// Manejar prellenado del formulario desde recomendaciones
document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.includes('register-book.html')) {
    const params = new URLSearchParams(window.location.search);
    const title = params.get('title');
    const author = params.get('author');
    
    if (title && author) {
      document.getElementById('title').value = title;
      document.getElementById('author').value = author;
    }
  }
});

