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
  
  if (!email || email.trim() === '') {
    return;
  }
  
  const trimmedEmail = email.trim();
  
  // Validar formato de email básico
  if (!trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
    const loginAlert = document.getElementById('loginAlert');
    if (loginAlert) {
      loginAlert.innerHTML = '<strong>Error:</strong> Por favor, ingresa un email válido.';
      loginAlert.style.display = 'block';
      setTimeout(() => {
        loginAlert.style.display = 'none';
      }, 3000);
    } else {
      alert('Por favor, ingresa un email válido.');
    }
    return;
  }
  
  try {
    // Mostrar indicador de carga
    const googleBtn = document.querySelector('.google-btn');
    const originalBtnText = googleBtn.innerHTML;
    googleBtn.disabled = true;
    googleBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Verificando...';
    
    // Verificar si el usuario ya está registrado en MongoDB
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: trimmedEmail })
    });
    
    if (response.success && response.user) {
      // Usuario existe, iniciar sesión
      localStorage.setItem('currentUser', JSON.stringify(response.user));
      window.location.href = 'dashboard.html';
    }
  } catch (error) {
    console.error('Error en login:', error);
    
    // Restaurar botón
    const googleBtn = document.querySelector('.google-btn');
    googleBtn.disabled = false;
    googleBtn.innerHTML = '<i class="bi bi-google"></i> Continuar con Google';
    
    // Verificar si es un error 404 (usuario no encontrado) o error de conexión
    const isUserNotFound = error.message.includes('no encontrado') || error.message.includes('404');
    const isConnectionError = error.message.includes('conectar') || error.message.includes('servidor');
    
    if (isConnectionError) {
      const loginAlert = document.getElementById('loginAlert');
      if (loginAlert) {
        loginAlert.innerHTML = '<strong>Error de conexión:</strong> ' + error.message;
        loginAlert.style.display = 'block';
      } else {
        alert('Error de conexión: ' + error.message);
      }
      return;
    }
    
    // Usuario no registrado, mostrar mensaje y formulario de registro
    const loginAlert = document.getElementById('loginAlert');
    if (loginAlert) {
      loginAlert.innerHTML = '<strong>¡Oops!</strong> Cuenta no registrada. Por favor, completa el registro primero.';
      loginAlert.style.display = 'block';
      
      // Después de 3 segundos, mostrar formulario de registro
      setTimeout(() => {
        loginAlert.style.display = 'none';
        document.getElementById('loginSection').classList.remove('active');
        document.getElementById('registerSection').classList.add('active');
        document.getElementById('email').value = trimmedEmail;
      }, 3000);
    } else {
      // Si no hay elemento de alerta, mostrar formulario directamente
      document.getElementById('loginSection').classList.remove('active');
      document.getElementById('registerSection').classList.add('active');
      document.getElementById('email').value = trimmedEmail;
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
      
      // Ocultar alertas previas
      const registerAlert = document.getElementById('registerAlert');
      if (registerAlert) {
        registerAlert.style.display = 'none';
      }
      
      // Validar campos requeridos
      if (!username || username.trim() === '') {
        showRegisterError('Por favor, ingresa un nombre de usuario.');
        return;
      }
      
      if (!email || email.trim() === '') {
        showRegisterError('Por favor, ingresa un email válido.');
        return;
      }
      
      // Validar que se hayan seleccionado géneros
      if (genres.length === 0) {
        showRegisterError('Por favor, selecciona al menos un género literario.');
        return;
      }
      
      // Validar booksPerMonth
      if (!booksPerMonth || booksPerMonth < 0) {
        showRegisterError('Por favor, ingresa un número válido de libros por mes.');
        return;
      }
      
      // Validar readingFormat
      if (!readingFormat || readingFormat === '') {
        showRegisterError('Por favor, selecciona un formato de lectura preferido.');
        return;
      }
      
      try {
        // Mostrar indicador de carga
        const submitButton = registerForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Registrando...';
        
        // Registrar usuario en MongoDB
        const response = await apiRequest('/auth/register', {
          method: 'POST',
          body: JSON.stringify({
            username: username.trim(),
            email: email.trim(),
            preferences: {
              genres,
              booksPerMonth: parseInt(booksPerMonth),
              favoriteAuthors: favoriteAuthors ? favoriteAuthors.split(',').map(a => a.trim()).filter(a => a) : [],
              readingFormat
            }
          })
        });
        
        if (response.success && response.user) {
          // Guardar usuario actual en localStorage
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          window.location.href = 'dashboard.html';
        } else {
          throw new Error('No se pudo completar el registro. Por favor, intenta nuevamente.');
        }
      } catch (error) {
        console.error('Error al registrar:', error);
        showRegisterError('Error al registrar usuario: ' + error.message);
        
        // Restaurar botón
        const submitButton = registerForm.querySelector('button[type="submit"]');
        submitButton.disabled = false;
        submitButton.textContent = 'Completar Registro';
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

// Mostrar error en el formulario de registro
function showRegisterError(message) {
  const registerAlert = document.getElementById('registerAlert');
  if (registerAlert) {
    registerAlert.innerHTML = '<strong>Error:</strong> ' + message;
    registerAlert.style.display = 'block';
    // Hacer scroll al mensaje de error
    registerAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } else {
    alert(message);
  }
}

