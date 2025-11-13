// Simulación de autenticación con Google
// En una aplicación real, esto se conectaría con Google OAuth API

// Verificar si el usuario está autenticado
function checkAuth() {
  const currentUser = localStorage.getItem('currentUser');
  const currentPath = window.location.pathname;
  const isIndexPage = currentPath.endsWith('index.html') || currentPath.endsWith('/') || currentPath === '' || currentPath.endsWith('/BiblioSmart/');
  
  if (!currentUser && !isIndexPage) {
    window.location.href = 'index.html';
    return false;
  }
  return currentUser ? JSON.parse(currentUser) : null;
}

// Manejar login con Google (simulado)
function handleGoogleLogin() {
  // Simular autenticación de Google
  // En producción, esto se conectaría con Google OAuth
  const email = prompt('Ingresa tu email de Google (simulación):');
  
  if (!email) {
    return;
  }
  
  // Verificar si el usuario ya está registrado
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.email === email);
  
  if (user) {
    // Usuario existe, iniciar sesión
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = 'dashboard.html';
  } else {
    // Usuario no registrado, mostrar mensaje de error
    const loginAlert = document.getElementById('loginAlert');
    if (loginAlert) {
      loginAlert.innerHTML = '<strong>¡Oops!</strong> Cuenta no registrada. Por favor, completa el registro primero.';
      loginAlert.style.display = 'block';
      
      // Después de 3 segundos, mostrar formulario de registro
      setTimeout(() => {
        loginAlert.style.display = 'none';
        document.getElementById('loginSection').classList.remove('active');
        document.getElementById('registerSection').classList.add('active');
        document.getElementById('email').value = email;
      }, 3000);
    } else {
      // Si no hay elemento de alerta, mostrar formulario directamente
      document.getElementById('loginSection').classList.remove('active');
      document.getElementById('registerSection').classList.add('active');
      document.getElementById('email').value = email;
    }
  }
}

// Manejar registro de usuario
document.addEventListener('DOMContentLoaded', function() {
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const genres = Array.from(document.querySelectorAll('input[name="genres"]:checked')).map(cb => cb.value);
      const booksPerMonth = document.getElementById('booksPerMonth').value;
      const favoriteAuthors = document.getElementById('favoriteAuthors').value;
      const readingFormat = document.getElementById('readingFormat').value;
      
      // Validar que se hayan seleccionado géneros
      if (genres.length === 0) {
        alert('Por favor, selecciona al menos un género literario.');
        return;
      }
      
      // Guardar usuario
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const newUser = {
        id: Date.now().toString(),
        username,
        email,
        preferences: {
          genres,
          booksPerMonth: parseInt(booksPerMonth),
          favoriteAuthors: favoriteAuthors.split(',').map(a => a.trim()).filter(a => a),
          readingFormat
        },
        createdAt: new Date().toISOString()
      };
      
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      // Inicializar libros del usuario
      const books = JSON.parse(localStorage.getItem('books') || '{}');
      if (!books[newUser.id]) {
        books[newUser.id] = [];
        localStorage.setItem('books', JSON.stringify(books));
      }
      
      window.location.href = 'dashboard.html';
    });
  }
  
  // Verificar autenticación en páginas protegidas
  const currentPath = window.location.pathname;
  const isProtectedPage = currentPath.includes('dashboard.html') || 
                          currentPath.includes('register-book.html') ||
                          currentPath.includes('view-books.html') ||
                          currentPath.includes('recommendations.html');
  
  if (isProtectedPage) {
    const user = checkAuth();
    if (!user) {
      return;
    }
    
    // Mostrar nombre de usuario si existe el elemento
    const userNameDisplay = document.getElementById('userNameDisplay');
    if (userNameDisplay) {
      userNameDisplay.textContent = user.username;
    }
  }
});

// Cerrar sesión
function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
}

// Obtener usuario actual
function getCurrentUser() {
  const currentUser = localStorage.getItem('currentUser');
  return currentUser ? JSON.parse(currentUser) : null;
}

