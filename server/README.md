# BiblioSmart Backend - MongoDB

Backend API para BiblioSmart usando Node.js, Express y MongoDB.

## 🚀 Instalación

### Prerrequisitos

- Node.js (v14 o superior)
- MongoDB (local o MongoDB Atlas)

### Pasos de Instalación

1. **Instalar dependencias:**

```bash
cd server
npm install
```

2. **Configurar variables de entorno:**

Crea un archivo `.env` en la carpeta `server/` basándote en `env.example.txt`:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/bibliosmart
NODE_ENV=development
```

### Para MongoDB Atlas (nube):

Si usas MongoDB Atlas, reemplaza `MONGODB_URI` con tu connection string:

```env
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/bibliosmart
```

### Para MongoDB local:

Asegúrate de tener MongoDB corriendo localmente:

**Windows:**
```bash
# Si MongoDB está instalado como servicio, debería iniciarse automáticamente
# Si no, ejecuta:
mongod
```

**macOS (con Homebrew):**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

3. **Iniciar el servidor:**

```bash
# Modo desarrollo (con nodemon - recarga automática)
npm run dev

# Modo producción
npm start
```

El servidor estará disponible en `http://localhost:3000`

## 📡 Endpoints de la API

### Autenticación (`/api/auth`)

- **POST** `/api/auth/login` - Iniciar sesión
  ```json
  {
    "email": "usuario@example.com"
  }
  ```

- **POST** `/api/auth/register` - Registrar nuevo usuario
  ```json
  {
    "username": "Juan",
    "email": "juan@example.com",
    "preferences": {
      "genres": ["Fantasía", "Ciencia Ficción"],
      "booksPerMonth": 5,
      "favoriteAuthors": ["Autor1", "Autor2"],
      "readingFormat": "Físico"
    }
  }
  ```

- **GET** `/api/auth/user/:id` - Obtener usuario por ID

### Libros (`/api/books`)

- **POST** `/api/books` - Crear nuevo libro
  ```json
  {
    "userId": "user_id",
    "title": "Título del libro",
    "author": "Autor",
    "isbn": "978-84-08-12345-6",
    "entryDate": "2024-01-01",
    "readingStatus": "Leído",
    "rating": 5,
    "review": "Reseña del libro"
  }
  ```

- **GET** `/api/books/user/:userId` - Obtener todos los libros de un usuario

- **GET** `/api/books/:id` - Obtener libro por ID

- **PUT** `/api/books/:id` - Actualizar libro

- **DELETE** `/api/books/:id` - Eliminar libro

## 🗄️ Estructura de la Base de Datos

### Colección: `users`

```javascript
{
  _id: ObjectId,
  username: String,
  email: String (único),
  preferences: {
    genres: [String],
    booksPerMonth: Number,
    favoriteAuthors: [String],
    readingFormat: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Colección: `books`

```javascript
{
  _id: ObjectId,
  userId: ObjectId (referencia a users),
  title: String,
  author: String,
  isbn: String,
  entryDate: Date,
  readingStatus: String,
  rating: Number (1-5),
  review: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔧 Configuración del Frontend

El frontend está configurado para conectarse a `http://localhost:3000/api` por defecto.

Si necesitas cambiar la URL de la API, edita `js/config.js`:

```javascript
const API_BASE_URL = 'http://localhost:3000/api';
```

## 📝 Notas

- Los datos se almacenan en MongoDB en lugar de localStorage
- El frontend mantiene el token de sesión (usuario actual) en localStorage
- Todas las peticiones usan JSON
- CORS está habilitado para desarrollo local

## 🐛 Solución de Problemas

### Error de conexión a MongoDB

- Verifica que MongoDB esté corriendo
- Revisa que la URI en `.env` sea correcta
- Para MongoDB Atlas, asegúrate de agregar tu IP a la whitelist

### Error CORS en el frontend

- Asegúrate de que el servidor esté corriendo en el puerto 3000
- Verifica que `js/config.js` tenga la URL correcta

## 📦 Dependencias

- **express**: Framework web para Node.js
- **mongoose**: ODM para MongoDB
- **cors**: Middleware para habilitar CORS
- **dotenv**: Carga variables de entorno

## 🔒 Seguridad (Para Producción)

- Implementar autenticación JWT
- Validar y sanitizar inputs
- Usar variables de entorno para secretos
- Implementar rate limiting
- Usar HTTPS

