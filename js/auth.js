// Autenticación con API MongoDB
// Verificar si el usuario está autenticado
async function checkAuth() {
  const currentUser = localStorage.getItem('currentUser');
  const currentPath = window.location.pathname;
  const isIndexPage = currentPath.endsWith('index.html') || currentPath.endsWith('/') || currentPath === '' || currentPath.endsWith('/BiblioSmart/');
  
  if (!currentUser && !isIndexPage) {
    window.location.href = 'index.html';
    return null;
  }
  
  if (!currentUser) {
    return null;
  }
  
  // Verificar que el usuario sigue siendo válido en el servidor
  try {
    const userData = JSON.parse(currentUser);
    const response = await apiRequest(`/auth/user/${userData.id}`);
    if (response.success) {
      // Actualizar datos del usuario en localStorage
      localStorage.setItem('currentUser', JSON.stringify(response.user));
      return response.user;
    }
  } catch (error) {
    // Usuario inválido o error de conexión, intentar usar datos locales
    console.warn('Error verificando usuario en servidor, usando datos locales:', error.message);
    try {
      return JSON.parse(currentUser);
    } catch (e) {
      localStorage.removeItem('currentUser');
      if (!isIndexPage) {
        window.location.href = 'index.html';
      }
      return null;
    }
  }
  
  // Fallback: devolver usuario de localStorage
  try {
    return JSON.parse(currentUser);
  } catch (e) {
    localStorage.removeItem('currentUser');
    if (!isIndexPage) {
      window.location.href = 'index.html';
    }
    return null;
  }
}

// Manejar login con Google (simulado)
async function handleGoogleLogin() {
  // Simular autenticación de Google
  // En producción, esto se conectaría con Google OAuth
  const email = prompt('Ingresa tu email de Google (simulación):');
  
  if (!email) {
    return;
  }
  
  try {
    // Verificar si el usuario ya está registrado en MongoDB
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email })
    });
    
    if (response.success && response.user) {
      // Usuario existe, iniciar sesión
      localStorage.setItem('currentUser', JSON.stringify(response.user));
      window.location.href = 'dashboard.html';
    }
  } catch (error) {
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
    registerForm.addEventListener('submit', async function(e) {
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
      
      try {
        // Registrar usuario en MongoDB
        const response = await apiRequest('/auth/register', {
          method: 'POST',
          body: JSON.stringify({
            username,
            email,
            preferences: {
              genres,
              booksPerMonth: parseInt(booksPerMonth),
              favoriteAuthors: favoriteAuthors.split(',').map(a => a.trim()).filter(a => a),
              readingFormat
            }
          })
        });
        
        if (response.success && response.user) {
          // Guardar usuario actual en localStorage
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          window.location.href = 'dashboard.html';
        }
      } catch (error) {
        alert('Error al registrar usuario: ' + error.message);
      }
    });
  }
  
  // Verificar autenticación en páginas protegidas
  const currentPath = window.location.pathname;
  const isProtectedPage = currentPath.includes('dashboard.html') || 
                          currentPath.includes('register-book.html') ||
                          currentPath.includes('view-books.html') ||
                          currentPath.includes('recommendations.html');
  
  if (isProtectedPage) {
    checkAuth().then(user => {
      if (!user) {
        return;
      }
      
      // Mostrar nombre de usuario si existe el elemento
      const userNameDisplay = document.getElementById('userNameDisplay');
      if (userNameDisplay) {
        userNameDisplay.textContent = user.username;
      }
    }).catch(error => {
      console.error('Error verificando autenticación:', error);
    });
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

