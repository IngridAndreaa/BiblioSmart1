# 📊 Diagrama de Clases - BiblioSmart

## Diagrama UML en formato PlantUML

Este diagrama muestra la estructura de clases de la aplicación BiblioSmart con MongoDB.

### 📝 Notas sobre el Diagrama

- **PlantUML**: Para visualizar, instala PlantUML o usa un visor online como:
  - http://www.plantuml.com/plantuml/uml/
  - https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml (VS Code Extension)

## 🔷 Estructura del Diagrama

### Modelos de Datos

1. **User** - Modelo de Usuario
   - Atributos: `_id`, `username`, `email`, `preferences`, `createdAt`, `updatedAt`
   - Métodos: `pre()`, `save()`, `findOne()`, `findById()`

2. **UserPreferences** - Preferencias del Usuario (Clase anidada)
   - Atributos: `genres[]`, `booksPerMonth`, `favoriteAuthors[]`, `readingFormat`
   - Enum: `readingFormat` → Físico, Digital, Audiolibro, Ambos

3. **Book** - Modelo de Libro
   - Atributos: `_id`, `userId`, `title`, `author`, `isbn`, `entryDate`, `readingStatus`, `rating`, `review`, `createdAt`, `updatedAt`
   - Métodos: `pre()`, `save()`, `find()`, `findById()`, `findByIdAndDelete()`, `index()`
   - Enum: `readingStatus` → Por leer, Leyendo, Leído, Abandonado
   - Restricción: `rating` → 1-5

### Controladores/Rutas

4. **AuthRouter** - Router de Autenticación
   - Rutas: `/login` (POST), `/register` (POST), `/user/:id` (GET)
   - Métodos: `login()`, `register()`, `getUserById()`

5. **BooksRouter** - Router de Libros
   - Rutas: `/` (POST), `/user/:userId` (GET), `/:id` (GET), `/:id` (PUT), `/:id` (DELETE)
   - Métodos: `createBook()`, `getUserBooks()`, `getBookById()`, `updateBook()`, `deleteBook()`, `validateUserId()`

### Servidor y Configuración

6. **App** - Aplicación Express Principal
   - Métodos: `use()`, `listen()`, `errorHandler()`

7. **Database** - Configuración de Base de Datos
   - Métodos: `connectDB()`

### DTOs (Data Transfer Objects)

8. **ApiResponse** - Respuesta de API
   - Campos: `success`, `message`, `user`, `book`, `books`, `error`

9. **UserDTO** - Usuario para transferencia
   - Campos: `id`, `username`, `email`, `preferences`, `createdAt`

10. **BookDTO** - Libro para transferencia
    - Campos: `id`, `userId`, `title`, `author`, `isbn`, `entryDate`, `readingStatus`, `rating`, `review`, `createdAt`, `updatedAt`

## 🔗 Relaciones

- **User** → **UserPreferences**: Composición (1:1)
- **User** → **Book**: Agregación (1:N) - Un usuario puede tener muchos libros
- **Book** → **User**: Asociación (N:1) - Cada libro pertenece a un usuario
- **AuthRouter** → **User**: Dependencia - Usa el modelo User
- **BooksRouter** → **Book**: Dependencia - Usa el modelo Book
- **BooksRouter** → **User**: Dependencia - Referencia al modelo User
- **App** → **AuthRouter**: Composición - App contiene AuthRouter
- **App** → **BooksRouter**: Composición - App contiene BooksRouter
- **App** → **Database**: Dependencia - App se conecta a Database
- Routers → **ApiResponse**: Dependencia - Retornan ApiResponse
- **ApiResponse** → **UserDTO/BookDTO**: Contención - Puede contener DTOs

## 📋 Diagrama Alternativo en Mermaid

```mermaid
classDiagram
    class User {
        -ObjectId _id
        -String username
        -String email
        -UserPreferences preferences
        -Date createdAt
        -Date updatedAt
        +save() Promise
        +findOne() Promise
        +findById() Promise
    }

    class UserPreferences {
        -String[] genres
        -Number booksPerMonth
        -String[] favoriteAuthors
        -String readingFormat
    }

    class Book {
        -ObjectId _id
        -ObjectId userId
        -String title
        -String author
        -String isbn
        -Date entryDate
        -String readingStatus
        -Number rating
        -String review
        -Date createdAt
        -Date updatedAt
        +save() Promise
        +find() Promise
        +findById() Promise
        +findByIdAndDelete() Promise
    }

    class AuthRouter {
        -Express.Router router
        +post(/login) void
        +post(/register) void
        +get(/user/:id) void
        +login() Promise~Response~
        +register() Promise~Response~
        +getUserById() Promise~Response~
    }

    class BooksRouter {
        -Express.Router router
        +post(/) void
        +get(/user/:userId) void
        +get(/:id) void
        +put(/:id) void
        +delete(/:id) void
        +createBook() Promise~Response~
        +getUserBooks() Promise~Response~
        +getBookById() Promise~Response~
        +updateBook() Promise~Response~
        +deleteBook() Promise~Response~
    }

    class App {
        -Express.Application app
        -Number port
        +use() void
        +listen() void
        +errorHandler() void
    }

    class Database {
        +connectDB() Promise~void~
    }

    class ApiResponse {
        +Boolean success
        +String message
        +UserDTO user
        +BookDTO book
        +BookDTO[] books
        +String error
    }

    User "1" *-- "1" UserPreferences : contiene
    User "1" ||--o{ Book : posee
    Book "N" --> "1" User : pertenece
    
    AuthRouter ..> User : usa
    BooksRouter ..> Book : usa
    BooksRouter ..> User : referencia
    
    App ..> AuthRouter : contiene
    App ..> BooksRouter : contiene
    App ..> Database : conecta
    
    AuthRouter --> ApiResponse : devuelve
    BooksRouter --> ApiResponse : devuelve
```

## 🎨 Visualización

### Opción 1: PlantUML
1. Copia el contenido de `DIAGRAMA_CLASES.puml`
2. Pégalo en: http://www.plantuml.com/plantuml/uml/
3. O instala la extensión PlantUML en VS Code

### Opción 2: Mermaid
1. El diagrama Mermaid está incluido arriba
2. Visualiza en: https://mermaid.live/
3. O usa la extensión Mermaid en VS Code/Markdown

### Opción 3: Herramientas Alternativas
- **Lucidchart**: Importa el diagrama manualmente
- **draw.io**: Crea el diagrama basándote en la estructura descrita
- **Visual Paradigm**: Importa PlantUML

## 📌 Características del Diagrama

✅ **Modelos MongoDB** con Mongoose  
✅ **Rutas Express** con controladores  
✅ **Relaciones** entre entidades  
✅ **DTOs** para transferencia de datos  
✅ **Tipos y enums** documentados  
✅ **Métodos principales** de cada clase  

