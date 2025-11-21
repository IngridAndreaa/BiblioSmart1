// Configuración de la API
const API_BASE_URL = 'http://localhost:3000/api';

// Funciones auxiliares para llamadas API
async function apiRequest(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    // Verificar si la respuesta es JSON válido
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      throw new Error(`Error del servidor: ${text || 'Respuesta no válida'}`);
    }

    if (!response.ok) {
      // Manejar error 503 (Servicio no disponible - MongoDB)
      if (response.status === 503) {
        throw new Error('MongoDB no está disponible. Por favor, inicia MongoDB localmente o verifica tu conexión a MongoDB Atlas.');
      }
      throw new Error(data.message || data.error || `Error ${response.status}: ${response.statusText}`);
    }

    return data;
  } catch (error) {
    console.error('Error en API:', error);
    
    // Manejar errores de red
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('No se pudo conectar con el servidor. Asegúrate de que el servidor esté corriendo en http://localhost:3000');
    }
    
    throw error;
  }
}
