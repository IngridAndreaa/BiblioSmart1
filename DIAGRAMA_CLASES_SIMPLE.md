# 📊 Diagrama de Clases Simplificado - BiblioSmart

## Vista General

```
┌─────────────────────────────────────────────────────────────┐
│                        BIBLIOSMART API                       │
└─────────────────────────────────────────────────────────────┘

┌──────────────┐                    ┌──────────────┐
│     User     │                    │     Book     │
├──────────────┤                    ├──────────────┤
│ +_id         │                    │ +_id         │
│ +username    │                    │ +userId      │
│ +email       │ 1                * │ +title       │
│ +preferences │◄───────────────────│ +author      │
│ +createdAt   │    posee libros    │ +isbn        │
│ +updatedAt   │                    │ +entryDate   │
└──────────────┘                    │ +status      │
                                    │ +rating      │
┌──────────────────┐                │ +review      │
│ UserPreferences  │                │ +createdAt   │
├──────────────────┤                │ +updatedAt   │
│ +genres[]        │                └──────────────┘
│ +booksPerMonth   │
│ +favoriteAuthors │
│ +readingFormat   │
└──────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                        EXPRESS ROUTERS                       │
├──────────────────────────────┬──────────────────────────────┤
│        AuthRouter            │        BooksRouter            │
├──────────────────────────────┼──────────────────────────────┤
│ +POST /login                 │ +POST /                       │
│ +POST /register              │ +GET /user/:userId            │
│ +GET /user/:id               │ +GET /:id                     │
│                              │ +PUT /:id                     │
│                              │ +DELETE /:id                  │
└──────────────────────────────┴──────────────────────────────┘
         │                               │
         └───────────┬───────────────────┘
                     │ usa
         ┌───────────▼───────────┐
         │      MongoDB          │
         │   (Mongoose ODM)      │
         └───────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                         App (Server)                         │
├─────────────────────────────────────────────────────────────┤
│ +use(middleware)                                             │
│ +listen(port)                                                │
│ +errorHandler()                                              │
└─────────────────────────────────────────────────────────────┘
         │
         └───► Conecta a Database ───► MongoDB
```

## 🔑 Clases Principales

### 1. User (Usuario)
```
┌─────────────────────────┐
│         User          │
├─────────────────────────┤
│ -_id: ObjectId           │
│ -username: String        │
│ -email: String (unique)  │
│ -preferences: Object     │
│ -createdAt: Date         │
│ -updatedAt: Date         │
├─────────────────────────┤
│ +save(): Promise         │
│ +findOne(): Promise      │
│ +findById(): Promise     │
└─────────────────────────┘
```

**Relación**: Un User tiene muchos Books (1:N)

### 2. Book (Libro)
```
┌─────────────────────────┐
│         Book            │
├─────────────────────────┤
│ -_id: ObjectId          │
│ -userId: ObjectId (FK)  │
│ -title: String          │
│ -author: String         │
│ -isbn: String           │
│ -entryDate: Date        │
│ -readingStatus: Enum    │
│ -rating: Number (1-5)   │
│ -review: String         │
│ -createdAt: Date        │
│ -updatedAt: Date        │
├─────────────────────────┤
│ +save(): Promise        │
│ +find(): Promise        │
│ +findById(): Promise    │
│ +findByIdAndDelete()    │
└─────────────────────────┘
```

**Relación**: Un Book pertenece a un User (N:1)

### 3. UserPreferences (Preferencias)
```
┌─────────────────────────┐
│   UserPreferences       │
├─────────────────────────┤
│ -genres: String[]       │
│ -booksPerMonth: Number  │
│ -favoriteAuthors: []    │
│ -readingFormat: Enum    │
└─────────────────────────┘
```

**Valores Enum**:
- `readingFormat`: "Físico" | "Digital" | "Audiolibro" | "Ambos"
- `readingStatus`: "Por leer" | "Leyendo" | "Leído" | "Abandonado"

## 🔄 Flujo de Datos

```
Frontend (HTML/JS)
       │
       │ HTTP Request
       ▼
┌──────────────────┐
│  Express App     │
│  (server.js)     │
└──────────────────┘
       │
       ├──► AuthRouter ──► User Model ──► MongoDB
       │
       └──► BooksRouter ──► Book Model ──► MongoDB
                                    │
                                    ▼
                              ┌──────────┐
                              │ MongoDB  │
                              │ Database │
                              └──────────┘
```

## 📋 Endpoints y Métodos

### AuthRouter
- `POST /api/auth/login` → `login()`
- `POST /api/auth/register` → `register()`
- `GET /api/auth/user/:id` → `getUserById()`

### BooksRouter
- `POST /api/books` → `createBook()`
- `GET /api/books/user/:userId` → `getUserBooks()`
- `GET /api/books/:id` → `getBookById()`
- `PUT /api/books/:id` → `updateBook()`
- `DELETE /api/books/:id` → `deleteBook()`

## 🗄️ Base de Datos

### Colección: `users`
```
{
  _id: ObjectId,
  username: String,
  email: String (único, indexado),
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
```
{
  _id: ObjectId,
  userId: ObjectId (referencia a users, indexado),
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

**Índices**:
- `users.email` → único
- `books.userId` → indexado para búsquedas rápidas
- `books.userId + books.createdAt` → índice compuesto

## 🎯 Patrones de Diseño Utilizados

1. **MVC (Model-View-Controller)**
   - Models: User, Book
   - Views: HTML/JS Frontend
   - Controllers: AuthRouter, BooksRouter

2. **Repository Pattern**
   - Mongoose proporciona métodos de acceso a datos

3. **DTO (Data Transfer Object)**
   - UserDTO, BookDTO para transferencia entre capas

4. **Middleware Pattern**
   - Express middleware para validación y CORS

