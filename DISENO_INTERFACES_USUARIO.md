# 4. Diseño de las Interfaces del Usuario

## 4.1. Perfiles de Usuario

### Perfil 1: Lector Casual
**Descripción:** Usuario que lee ocasionalmente, entre 1-3 libros por mes, principalmente por entretenimiento.

**Características:**
- Edad: 25-45 años
- Nivel tecnológico: Intermedio
- Objetivo principal: Organizar sus lecturas y descubrir nuevos libros
- Preferencias: Géneros populares (Romance, Suspenso, Misterio)
- Formato preferido: Digital o Físico

**Necesidades:**
- Registro simple y rápido de libros leídos
- Visualización clara de su biblioteca personal
- Recomendaciones básicas basadas en géneros favoritos

---

### Perfil 2: Lector Ávido
**Descripción:** Usuario que lee frecuentemente, más de 5 libros por mes, con intereses literarios diversos.

**Características:**
- Edad: 30-55 años
- Nivel tecnológico: Avanzado
- Objetivo principal: Gestión completa de biblioteca y descubrimiento de nuevas lecturas
- Preferencias: Múltiples géneros (Fantasía, Ciencia Ficción, No Ficción, Biografía)
- Formato preferido: Ambos (Físico y Digital)

**Necesidades:**
- Sistema completo de catalogación con reseñas y calificaciones
- Búsqueda y filtrado avanzado de libros
- Recomendaciones personalizadas inteligentes basadas en historial de lectura
- Estadísticas de lectura (libros leídos, calificación promedio)

---

### Perfil 3: Estudiante/Investigador
**Descripción:** Usuario que lee principalmente para fines académicos o profesionales.

**Características:**
- Edad: 18-35 años
- Nivel tecnológico: Avanzado
- Objetivo principal: Organización de material de estudio y referencias
- Preferencias: No Ficción, Historia, Biografía
- Formato preferido: Digital (fácil acceso y búsqueda)

**Necesidades:**
- Registro detallado con ISBN para referencias académicas
- Categorización por estado de lectura (Por leer, Leyendo, Leído)
- Sistema de búsqueda eficiente
- Reseñas y notas de estudio

---

## 4.2. Lista Priorizada de Funcionalidades Clave

### Prioridad ALTA (MVP - Funcionalidades Esenciales)

1. **Autenticación y Registro de Usuario**
   - Login con Google OAuth
   - Registro de preferencias literarias (géneros, formato, autores favoritos)
   - Gestión de perfil de usuario

2. **Registro de Libros**
   - Formulario de registro con campos esenciales (título, autor, ISBN)
   - Estado de lectura (Por leer, Leyendo, Leído, Abandonado)
   - Calificación con sistema de estrellas (1-5)
   - Fecha de ingreso

3. **Visualización de Biblioteca Personal**
   - Listado de todos los libros registrados
   - Búsqueda por título, autor o ISBN
   - Visualización de detalles (calificación, estado, reseña)

4. **Dashboard Principal**
   - Acceso rápido a funcionalidades principales
   - Estadísticas básicas (total de libros, calificación promedio, libros leídos)

### Prioridad MEDIA (Funcionalidades Importantes)

5. **Edición de Libros Registrados**
   - Modificación de información de libros existentes
   - Actualización de estado de lectura
   - Edición de reseñas y calificaciones

6. **Sistema de Recomendaciones por IA**
   - Recomendaciones basadas en preferencias del usuario
   - Análisis de historial de lectura
   - Sugerencias personalizadas de nuevos libros

7. **Reseñas y Notas**
   - Campo de reseña opcional para cada libro
   - Almacenamiento de notas personales

### Prioridad BAJA (Mejoras Futuras)

8. **Estadísticas Avanzadas**
   - Gráficos de lectura por mes
   - Análisis de géneros más leídos
   - Progreso de lectura anual

9. **Compartir Biblioteca**
   - Funcionalidad comunitaria (futuro)
   - Compartir reseñas con otros usuarios

10. **Exportación de Datos**
    - Exportar biblioteca en formato CSV/JSON
    - Generación de reportes

---

    ## 4.3. Organización Jerárquica de la Información

    ### Estructura de Navegación Principal

    ```
    BiblioSmart
    │
    ├── Página de Inicio (index.html)
    │   ├── Login con Google
    │   └── Registro de Usuario (si no existe)
    │       ├── Nombre de usuario
    │       ├── Email (automático desde Google)
    │       ├── Géneros literarios favoritos
    │       ├── Libros por mes
    │       ├── Autores favoritos
    │       └── Formato de lectura preferido
    │
    ├── Dashboard (dashboard.html) [PROTEGIDO]
    │   ├── Navegación Principal
    │   │   ├── Nombre de usuario
    │   │   └── Botón cerrar sesión
    │   │
    │   ├── Carousel de Funcionalidades
    │   │   ├── Registrar Libros
    │   │   ├── Ver Libros Registrados
    │   │   └── Recomendaciones por IA
    │   │
    │   └── Estadísticas Rápidas
    │       ├── Total de Libros
    │       ├── Calificación Promedio
    │       └── Libros Leídos
    │
    ├── Registrar Libro (register-book.html) [PROTEGIDO]
    │   ├── Formulario de Registro
    │   │   ├── Título del Libro *
    │   │   ├── Autor *
    │   │   ├── ISBN (opcional)
    │   │   ├── Fecha de Ingreso *
    │   │   ├── Estado de Lectura *
    │   │   │   └── Por leer / Leyendo / Leído / Abandonado
    │   │   ├── Calificación con Estrellas * (1-5)
    │   │   └── Reseña (opcional)
    │   │
    │   └── Acciones
    │       ├── Botón Guardar
    │       └── Botón Cancelar (volver a Dashboard)
    │
    ├── Ver Libros (view-books.html) [PROTEGIDO]
    │   ├── Barra de Búsqueda
    │   │   └── Filtro por título, autor o ISBN
    │   │
    │   ├── Lista de Libros
    │   │   └── Tarjeta de Libro
    │   │       ├── Título y Autor
    │   │       ├── ISBN (si existe)
    │   │       ├── Estado de Lectura (badge)
    │   │       ├── Calificación (estrellas)
    │   │       ├── Fecha de Ingreso
    │   │       ├── Reseña (si existe)
    │   │       └── Acciones
    │   │           ├── Editar
    │   │           └── Eliminar
    │   │
    │   └── Modal de Edición
    │       └── Formulario completo (mismo que registro)
    │
    └── Recomendaciones IA (recommendations.html) [PROTEGIDO]
        ├── Información Contextual
        │   └── Explicación del sistema de recomendaciones
        │
        ├── Botón Generar Recomendaciones
        │
        └── Lista de Recomendaciones
            └── Tarjeta de Recomendación
                ├── Badge "Recomendado por IA"
                ├── Título y Autor
                ├── Razón de la recomendación
                └── Botón "Registrar Libro"
                    └── Redirige a register-book.html con datos prellenados
    ```

### Jerarquía Visual de Elementos

**Nivel 1 - Navegación Global:**
- Barra de navegación superior (siempre visible en páginas protegidas)
- Logo/Branding (BiblioSmart)
- Información de usuario
- Enlaces principales (Dashboard, Ver Libros, etc.)
- Botón cerrar sesión

**Nivel 2 - Contenido Principal:**
- Título de sección
- Contenedor principal con funcionalidad específica
- Elementos interactivos principales (botones, formularios)

**Nivel 3 - Contenido Secundario:**
- Tarjetas de información (libros, recomendaciones)
- Formularios de entrada
- Estadísticas y métricas

**Nivel 4 - Detalles y Acciones:**
- Información adicional en tarjetas
- Botones de acción (editar, eliminar, registrar)
- Modales y diálogos

---

## 4.4. Mapa del Sitio / Diagrama de Navegación

### Diagrama de Flujo de Navegación

```
                    [index.html]
                    Página de Inicio
                         │
                         ├─¿Usuario existe?
                         │
            ┌────────────┴────────────┐
            │                         │
         [SÍ]                      [NO]
            │                         │
            │                         │
    ┌───────▼────────┐      ┌────────▼────────┐
    │  Login Google  │      │ Formulario de    │
    │  (automático)  │      │ Registro         │
    └───────┬────────┘      └────────┬────────┘
            │                        │
            └────────┬───────────────┘
                     │
            ┌────────▼────────┐
            │  [dashboard.html]│
            │   Dashboard     │
            └────────┬─────────┘
                     │
        ┌────────────┼────────────┬──────────────┐
        │            │            │              │
        │            │            │              │
┌───────▼────┐ ┌─────▼─────┐ ┌───▼──────────┐ ┌───▼────────────┐
│ Registrar │ │ Ver       │ │ Recomendaciones│ │ Cerrar Sesión │
│ Libro     │ │ Libros    │ │ por IA        │ │               │
└─────┬──────┘ └─────┬─────┘ └───┬──────────┘ └───┬────────────┘
      │              │            │                │
      │              │            │                │
      │      ┌───────▼──────┐     │                │
      │      │ Modal Editar │     │                │
      │      │ Libro        │     │                │
      │      └──────────────┘     │                │
      │                           │                │
      │                  ┌────────▼────────┐       │
      │                  │ Registrar desde │       │
      │                  │ Recomendación   │       │
      │                  └─────────────────┘       │
      │                                             │
      └─────────────────────────────────────────────┘
                      (Vuelve a index.html)
```

### Matriz de Navegación

| Desde \ Hacia | index.html | dashboard.html | register-book.html | view-books.html | recommendations.html |
|---------------|------------|----------------|-------------------|-----------------|---------------------|
| **index.html** | - | ✓ (si autenticado) | - | - | - |
| **dashboard.html** | ✓ (logout) | - | ✓ | ✓ | ✓ |
| **register-book.html** | ✓ (logout) | ✓ | - | ✓ | - |
| **view-books.html** | ✓ (logout) | ✓ | ✓ | - | ✓ |
| **recommendations.html** | ✓ (logout) | ✓ | ✓ (con datos) | ✓ | - |

**Leyenda:**
- ✓ = Navegación permitida
- - = Navegación no permitida o no aplicable

### Reglas de Navegación

1. **Protección de Rutas:**
   - Todas las páginas excepto `index.html` requieren autenticación
   - Si el usuario no está autenticado, se redirige automáticamente a `index.html`

2. **Navegación desde Dashboard:**
   - El dashboard es el punto central de navegación
   - Desde aquí se puede acceder a todas las funcionalidades principales

3. **Navegación Contextual:**
   - Desde `recommendations.html` se puede ir directamente a `register-book.html` con datos prellenados
   - Desde `view-books.html` se puede editar un libro (modal) o ir a registrar uno nuevo

4. **Cerrar Sesión:**
   - Disponible desde cualquier página protegida
   - Redirige siempre a `index.html`

---

## 4.5. Prototipo de la Solución

### 4.5.1. Características del Diseño

#### Paleta de Colores
- **Color Principal:** Gradiente púrpura (#563d7c a #8e6cbd)
- **Color Secundario:** Blanco (#ffffff)
- **Color de Fondo:** Gris claro (#f8f9fa)
- **Color de Acento:** Amarillo (#ffc107) para estrellas
- **Color de Texto:** Gris oscuro (#212529) y gris medio (#6c757d)

#### Tipografía
- **Fuente Principal:** Bootstrap default (system fonts)
- **Tamaños:** 
  - Títulos principales: 2rem (32px)
  - Subtítulos: 1.5rem (24px)
  - Texto normal: 1rem (16px)
  - Texto pequeño: 0.85rem (14px)

#### Componentes de UI

1. **Barra de Navegación:**
   - Fondo con gradiente púrpura
   - Logo con icono de libro
   - Información de usuario a la derecha
   - Menú responsive con hamburguesa en móviles

2. **Tarjetas (Cards):**
   - Fondo blanco
   - Bordes redondeados (15px)
   - Sombra sutil para profundidad
   - Efecto hover con elevación

3. **Botones:**
   - Estilo primario: Fondo púrpura, texto blanco
   - Estilo secundario: Fondo gris, texto oscuro
   - Efectos hover con transformación y sombra
   - Iconos de Bootstrap Icons

4. **Formularios:**
   - Campos con bordes redondeados
   - Etiquetas claras con asterisco para campos requeridos
   - Validación visual con Bootstrap
   - Mensajes de error en rojo

5. **Sistema de Estrellas:**
   - 5 estrellas interactivas
   - Color amarillo (#ffc107) cuando están activas
   - Efecto hover para mejor UX
   - Visualización clara de la calificación

### 4.5.2. Descripción de Pantallas

#### Pantalla 1: Página de Inicio (index.html)
**Propósito:** Autenticación y registro inicial de usuarios

**Elementos principales:**
- Animación Lottie a la izquierda (en desktop)
- Contenedor de login/registro a la derecha
- Botón "Continuar con Google" prominente
- Formulario de registro que aparece dinámicamente si el usuario no existe
- Validación en tiempo real de campos

**Flujo de usuario:**
1. Usuario ingresa email de Google
2. Sistema verifica si existe
3. Si existe → Login automático → Dashboard
4. Si no existe → Muestra formulario de registro → Dashboard después de completar

---

#### Pantalla 2: Dashboard (dashboard.html)
**Propósito:** Punto central de navegación y resumen de la biblioteca

**Elementos principales:**
- Carousel con 3 opciones principales:
  1. Registrar Libros
  2. Ver Libros Registrados
  3. Recomendaciones por IA
- Tarjetas de estadísticas (Total libros, Calificación promedio, Libros leídos)
- Navegación superior con información de usuario

**Características UX:**
- Carousel no automático (control manual)
- Navegación clara con iconos grandes
- Estadísticas actualizadas en tiempo real
- Diseño limpio y centrado

---

#### Pantalla 3: Registrar Libro (register-book.html)
**Propósito:** Permitir al usuario agregar nuevos libros a su biblioteca

**Elementos principales:**
- Formulario completo con campos:
  - Título y Autor (requeridos)
  - ISBN (opcional)
  - Fecha de ingreso (prellenada con fecha actual)
  - Estado de lectura (dropdown)
  - Calificación con estrellas (interactiva)
  - Reseña (textarea opcional)
- Botones de acción (Guardar/Cancelar)

**Características UX:**
- Validación de campos requeridos
- Sistema de estrellas intuitivo
- Prellenado automático si viene de recomendaciones
- Feedback visual al guardar

---

#### Pantalla 4: Ver Libros (view-books.html)
**Propósito:** Visualizar, buscar y gestionar todos los libros registrados

**Elementos principales:**
- Barra de búsqueda en tiempo real
- Lista de tarjetas de libros con:
  - Información completa del libro
  - Badge de estado de lectura
  - Calificación visual con estrellas
  - Botones de acción (Editar/Eliminar)
- Modal de edición (mismo formulario que registro)

**Características UX:**
- Búsqueda instantánea sin recargar página
- Tarjetas con efecto hover
- Modal para edición sin cambiar de página
- Confirmación antes de eliminar
- Estado vacío cuando no hay libros

---

#### Pantalla 5: Recomendaciones IA (recommendations.html)
**Propósito:** Mostrar recomendaciones personalizadas basadas en preferencias

**Elementos principales:**
- Botón para generar nuevas recomendaciones
- Lista de tarjetas de recomendaciones con:
  - Badge "Recomendado por IA"
  - Título y autor
  - Razón de la recomendación
  - Botón para registrar directamente
- Spinner de carga durante generación

**Características UX:**
- Generación automática al cargar la página
- Explicación clara de por qué se recomienda cada libro
- Integración directa con registro de libros
- Diseño atractivo con gradientes

### 4.5.3. Principios de UX Aplicados

1. **Consistencia:**
   - Misma barra de navegación en todas las páginas protegidas
   - Mismos estilos de botones y tarjetas
   - Paleta de colores uniforme

2. **Feedback Visual:**
   - Mensajes de error claros
   - Indicadores de carga
   - Confirmaciones de acciones
   - Efectos hover en elementos interactivos

3. **Simplicidad:**
   - Formularios claros y concisos
   - Navegación intuitiva
   - Iconos descriptivos
   - Textos cortos y directos

4. **Accesibilidad:**
   - Contraste adecuado de colores
   - Etiquetas en todos los campos
   - Navegación por teclado
   - Diseño responsive

5. **Eficiencia:**
   - Búsqueda en tiempo real
   - Prellenado de formularios cuando es posible
   - Accesos rápidos desde dashboard
   - Validación antes de enviar

### 4.5.4. Responsive Design

**Breakpoints:**
- **Desktop:** > 992px (pantalla completa con animación Lottie)
- **Tablet:** 768px - 992px (layout adaptado, sin animación)
- **Mobile:** < 768px (stack vertical, menú hamburguesa)

**Adaptaciones móviles:**
- Menú colapsable en navbar
- Formularios en columna única
- Tarjetas de ancho completo
- Botones de tamaño táctil adecuado
- Carousel optimizado para swipe

---

## 4.6. Conclusión del Diseño

El diseño de las interfaces de BiblioSmart se ha desarrollado con un enfoque centrado en el usuario, priorizando la simplicidad, la eficiencia y la experiencia visual agradable. La estructura jerárquica clara, el mapa de navegación intuitivo y el prototipo funcional garantizan que los usuarios puedan gestionar su biblioteca personal de manera efectiva, mientras disfrutan de recomendaciones personalizadas basadas en sus preferencias literarias.

El sistema está preparado para escalar y agregar funcionalidades futuras como la comunidad de lectores y estadísticas avanzadas, manteniendo siempre la usabilidad y la experiencia del usuario como prioridad principal.







