# BiblioSmart - Biblioteca Personal y Comunitaria

Aplicación web para gestionar tu biblioteca personal, compartir preferencias literarias y obtener recomendaciones de libros.

## Características

- **Registro con Google**: Autenticación simulada con Google (lista para integrar con Google OAuth)
- **Gestión de Preferencias**: Registro de géneros favoritos, autores preferidos y hábitos de lectura
- **Registro de Libros**: Agregar libros con título, autor, ISBN, fecha de ingreso, estado de lectura, reseña y calificación con estrellas
- **Visualización y Edición**: Ver todos tus libros registrados, editarlos y eliminarlos
- **Recomendaciones por IA**: Obtener recomendaciones personalizadas basadas en tus preferencias
- **Diseño Responsive**: Compatible con dispositivos móviles, tablets y escritorio usando Bootstrap

## Estructura del Proyecto

```
BiblioSmart/
├── index.html              # Página de login/registro
├── dashboard.html          # Dashboard principal con carousel
├── register-book.html      # Formulario de registro de libros
├── view-books.html         # Visualización y edición de libros
├── recommendations.html    # Recomendaciones por IA
├── js/
│   ├── auth.js            # Autenticación y gestión de usuarios
│   ├── books.js           # Gestión de libros
│   ├── dashboard.js       # Estadísticas del dashboard
│   ├── view-books.js      # Visualización y edición de libros
│   └── recommendations.js # Generación de recomendaciones
└── README.md              # Este archivo
```

## Cómo Usar

### 1. Registro Inicial

1. Abre `index.html` en tu navegador
2. Haz clic en "Continuar con Google"
3. Ingresa tu email (simulación)
4. Si es la primera vez, completa el formulario de registro:
   - Nombre de usuario
   - Géneros literarios favoritos (al menos uno)
   - Libros leídos por mes
   - Autores favoritos (opcional)
   - Formato de lectura preferido

### 2. Login

1. Si ya estás registrado, ingresa tu email de Google
2. Si la cuenta no está registrada, verás el mensaje: "¡Oops! Cuenta no registrada"
3. Después de 3 segundos, se mostrará el formulario de registro

### 3. Dashboard

Una vez iniciada sesión, verás un carousel con tres opciones:

- **Registrar Libros**: Agregar nuevos libros a tu biblioteca
- **Ver Libros Registrados**: Ver y editar tus libros
- **Recomendaciones por IA**: Obtener recomendaciones personalizadas

### 4. Registrar Libros

1. Completa el formulario con:
   - Título del libro
   - Autor
   - ISBN (opcional)
   - Fecha de ingreso
   - Estado de lectura (Por leer, Leyendo, Leído, Abandonado)
   - Calificación con estrellas (1-5)
   - Reseña (opcional)

### 5. Ver y Editar Libros

- Visualiza todos tus libros registrados
- Busca libros por título, autor o ISBN
- Edita información de cualquier libro
- Elimina libros de tu biblioteca

### 6. Recomendaciones por IA

- Obtén recomendaciones basadas en tus preferencias literarias
- Las recomendaciones consideran:
  - Tus géneros favoritos
  - Tus autores preferidos
  - Los libros que ya has leído
- Agrega recomendaciones directamente a tu biblioteca

## Tecnologías Utilizadas

- **HTML5**: Estructura de la aplicación
- **CSS3**: Estilos personalizados
- **Bootstrap 5.3.3**: Framework CSS para diseño responsive
- **Bootstrap Icons**: Iconos
- **JavaScript (Vanilla)**: Lógica de la aplicación
- **LocalStorage**: Almacenamiento de datos en el navegador

## Notas Importantes

- **Autenticación Simulada**: La autenticación con Google está simulada. En producción, necesitarías integrar Google OAuth API.
- **Almacenamiento Local**: Los datos se almacenan en el navegador usando LocalStorage. Los datos se perderán si limpias el caché del navegador.
- **Recomendaciones**: Las recomendaciones son simuladas y se basan en una base de datos de libros populares. En producción, podrías integrar una API de IA real.

## Mejoras Futuras

- Integración real con Google OAuth
- Backend con base de datos real
- Sistema de usuarios comunitarios
- Compartir libros y reseñas
- Integración con APIs de libros (Google Books, Open Library)
- Recomendaciones con IA real (OpenAI, etc.)
- Exportar biblioteca a PDF
- Generar códigos QR para compartir perfil

## Compatibilidad

- Navegadores modernos (Chrome, Firefox, Safari, Edge)
- Responsive design para móviles, tablets y escritorio
- Funciona sin conexión (una vez cargada la página)

## Licencia

Este proyecto es de código abierto y está disponible para uso personal y educativo.

