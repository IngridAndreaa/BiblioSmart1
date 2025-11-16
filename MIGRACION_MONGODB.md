# 🚀 Guía de Migración a MongoDB

Esta guía te ayudará a migrar tu aplicación BiblioSmart de localStorage a MongoDB.

## 📋 Resumen de Cambios

- ✅ Backend creado con Node.js + Express + MongoDB
- ✅ Modelos de datos (Users y Books) con Mongoose
- ✅ API REST completa para autenticación y libros
- ✅ Frontend actualizado para usar API en lugar de localStorage

## 🎯 Pasos para Migrar

### 1. Instalar MongoDB

#### Opción A: MongoDB Local

**Windows:**
1. Descarga MongoDB desde: https://www.mongodb.com/try/download/community
2. Instala MongoDB Community Edition
3. MongoDB debería iniciarse automáticamente como servicio

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongod
```

#### Opción B: MongoDB Atlas (Recomendado para producción)

1. Ve a https://www.mongodb.com/cloud/atlas
2. Crea una cuenta gratuita
3. Crea un nuevo cluster (gratis)
4. Obtén tu connection string

### 2. Configurar el Backend

1. **Navega a la carpeta del servidor:**
```bash
cd server
```

2. **Instala las dependencias:**
```bash
npm install
```

3. **Crea el archivo `.env`:**
```bash
# En Windows (PowerShell)
Copy-Item env.example.txt .env

# En macOS/Linux
cp env.example.txt .env
```

4. **Edita el archivo `.env`:**

Para MongoDB local:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/bibliosmart
NODE_ENV=development
```

Para MongoDB Atlas:
```env
PORT=3000
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/bibliosmart
NODE_ENV=development
```

**Reemplaza `usuario` y `password` con tus credenciales de Atlas.**

5. **Inicia el servidor:**
```bash
# Modo desarrollo (con recarga automática)
npm run dev

# Modo producción
npm start
```

Deberías ver:
```
✅ MongoDB conectado: ...
🚀 Servidor corriendo en puerto 3000
📍 API disponible en http://localhost:3000/api
```

### 3. Verificar que Todo Funciona

1. **Abre el frontend en tu navegador:**
   - Abre `index.html` o tu servidor local del frontend

2. **Prueba crear un nuevo usuario:**
   - El frontend ahora guardará los datos en MongoDB en lugar de localStorage

3. **Verifica en MongoDB:**

**Con MongoDB Compass (GUI):**
- Descarga: https://www.mongodb.com/products/compass
- Conéctate a tu base de datos
- Deberías ver las colecciones `users` y `books`

**O con la terminal de MongoDB:**
```bash
# Conectarse a MongoDB
mongosh

# Usar la base de datos
use bibliosmart

# Ver usuarios
db.users.find().pretty()

# Ver libros
db.books.find().pretty()
```

## 🔄 Migración de Datos Existentes

Si ya tienes datos en localStorage y quieres migrarlos a MongoDB:

### Script de Migración (Opcional)

Crea un archivo `server/migrate.js`:

```javascript
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/User');
const Book = require('./models/Book');

// Esta función migraría datos desde localStorage
// Nota: Necesitarías exportar los datos de localStorage primero

async function migrateData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');
    
    // Aquí iría tu lógica de migración
    // Por ejemplo, leer un archivo JSON con datos de localStorage
    
    console.log('✅ Migración completada');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error en migración:', error);
    process.exit(1);
  }
}

migrateData();
```

## 📊 Estructura de Datos

### Antes (localStorage):
```javascript
// localStorage.getItem('users') → Array JSON
// localStorage.getItem('books') → Object JSON { userId: [books] }
```

### Después (MongoDB):
```javascript
// Colección: users → Array de documentos
// Colección: books → Array de documentos con referencia a userId
```

## ⚠️ Diferencias Importantes

1. **IDs de Usuario:**
   - Antes: `id: "timestamp"` (String)
   - Ahora: `_id: ObjectId` (MongoDB ObjectId)

2. **Formato de Fechas:**
   - Antes: Strings ISO
   - Ahora: Objetos Date de MongoDB

3. **Almacenamiento de Libros:**
   - Antes: `books[userId] = [...]`
   - Ahora: Cada libro tiene un campo `userId` que referencia al usuario

## 🔧 Configuración del Frontend

El frontend ya está configurado para usar la API. Solo asegúrate de:

1. **Archivo `js/config.js` tiene la URL correcta:**
```javascript
const API_BASE_URL = 'http://localhost:3000/api';
```

2. **Todos los HTML incluyen `js/config.js` antes de otros scripts:**
```html
<script src="js/config.js"></script>
<script src="js/auth.js"></script>
```

## 🐛 Solución de Problemas

### Error: "MongoDB no conectado"
- Verifica que MongoDB esté corriendo
- Revisa la URI en `.env`
- Para Atlas, verifica tu IP en la whitelist

### Error: "CORS policy"
- Asegúrate de que el servidor esté corriendo en el puerto 3000
- Verifica que `cors` esté instalado en el backend

### Los datos no aparecen
- Verifica la consola del navegador (F12) para ver errores
- Revisa que la API esté respondiendo: `http://localhost:3000/api`
- Verifica que los scripts estén cargados en el orden correcto

## ✅ Checklist de Migración

- [ ] MongoDB instalado y corriendo
- [ ] Dependencias del backend instaladas (`npm install`)
- [ ] Archivo `.env` configurado
- [ ] Servidor backend corriendo (`npm run dev`)
- [ ] Frontend actualizado con `js/config.js`
- [ ] Probado crear un usuario nuevo
- [ ] Probado agregar un libro
- [ ] Verificado datos en MongoDB

## 🎉 ¡Listo!

Tu aplicación ahora usa MongoDB en lugar de localStorage. Los datos son persistentes, escalables y accesibles desde cualquier dispositivo (con autenticación adecuada).

## 📚 Recursos

- [Documentación de MongoDB](https://docs.mongodb.com/)
- [Documentación de Mongoose](https://mongoosejs.com/)
- [Documentación de Express](https://expressjs.com/)
- [MongoDB Atlas (Gratis)](https://www.mongodb.com/cloud/atlas)

