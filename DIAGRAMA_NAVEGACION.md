# Diagrama de Navegación - BiblioSmart

## Diagrama Visual del Flujo de Usuario

```
┌─────────────────────────────────────────────────────────────────┐
│                    PÁGINA DE INICIO                              │
│                      (index.html)                                │
│                                                                   │
│  ┌──────────────┐         ┌──────────────────────┐            │
│  │  Animación   │         │   Formulario Login    │            │
│  │   Lottie     │         │                       │            │
│  │              │         │  [Continuar Google]    │            │
│  └──────────────┘         └───────────┬───────────┘            │
│                                       │                          │
└───────────────────────────────────────┼──────────────────────────┘
                                        │
                        ┌───────────────┴───────────────┐
                        │                               │
                   ¿Usuario existe?                     │
                        │                               │
            ┌───────────┴───────────┐                   │
            │                       │                   │
          [SÍ]                    [NO]                  │
            │                       │                   │
    ┌───────▼───────┐    ┌─────────▼─────────┐        │
    │ Login Auto    │    │ Formulario        │        │
    │               │    │ Registro          │        │
    │ - Email       │    │ - Username        │        │
    │ - Prefs       │    │ - Géneros         │        │
    └───────┬───────┘    │ - Libros/mes      │        │
            │            │ - Formato         │        │
            └────────────┴─────────┬─────────┘        │
                                   │                  │
                    ┌──────────────▼──────────────┐   │
                    │      DASHBOARD              │   │
                    │   (dashboard.html)          │   │
                    │                             │   │
                    │  ┌──────────────────────┐ │   │
                    │  │  Carousel Opciones    │ │   │
                    │  │                       │ │   │
                    │  │  [1] Registrar Libro  │ │   │
                    │  │  [2] Ver Libros       │ │   │
                    │  │  [3] Recomendaciones  │ │   │
                    │  └──────────────────────┘ │   │
                    │                             │   │
                    │  ┌──────────────────────┐ │   │
                    │  │  Estadísticas        │ │   │
                    │  │  - Total: X          │ │   │
                    │  │  - Promedio: X.X     │ │   │
                    │  │  - Leídos: X          │ │   │
                    │  └──────────────────────┘ │   │
                    └───────────┬────────────────┘   │
                                │                     │
        ┌───────────────────────┼─────────────────────┘
        │                       │                       │
        │                       │                       │
┌───────▼────────┐   ┌──────────▼──────────┐  ┌──────▼──────────────┐
│ REGISTRAR      │   │ VER LIBROS           │  │ RECOMENDACIONES     │
│ LIBRO          │   │ (view-books.html)    │  │ (recommendations.   │
│                │   │                      │  │  html)              │
│ ┌──────────┐  │   │ ┌──────────────────┐ │  │                     │
│ │ Formulario│  │   │ │ Barra Búsqueda   │ │  │ ┌────────────────┐ │
│ │           │  │   │ └──────────────────┘ │  │ │ Botón Generar  │ │
│ │ - Título  │  │   │                      │  │ │ Recomendaciones│ │
│ │ - Autor   │  │   │ ┌──────────────────┐ │  │ └────────────────┘ │
│ │ - ISBN    │  │   │ │ Lista Libros     │ │  │                     │
│ │ - Estado  │  │   │ │                  │ │  │ ┌────────────────┐ │
│ │ - Rating  │  │   │ │ [Tarjeta Libro]  │ │  │ │ Tarjetas       │ │
│ │ - Reseña  │  │   │ │ - Título/Autor   │ │  │ │ Recomendación  │ │
│ └──────────┘  │   │ │ - Estado         │ │  │ │ - Badge IA     │ │
│                │   │ │ - Rating         │ │  │ │ - Título/Autor │ │
│ [Guardar]      │   │ │ - Reseña         │ │  │ │ - Razón        │ │
│ [Cancelar]     │   │ │ [Editar][Eliminar]│ │  │ │ [Registrar]    │ │
└───────┬────────┘   │ └──────────────────┘ │  │ └────────────────┘ │
        │            │                      │  │                     │
        │            │ ┌──────────────────┐ │  │                     │
        │            │ │ Modal Editar     │ │  │                     │
        │            │ │ (Mismo formulario)│ │  │                     │
        │            │ └──────────────────┘ │  │                     │
        │            └──────────┬───────────┘  └──────────┬──────────┘
        │                       │                         │
        │                       │                         │
        └───────────────────────┴─────────────────────────┘
                                  │
                                  │
                    ┌─────────────▼─────────────┐
                    │   CERRAR SESIÓN           │
                    │   (logout)                │
                    └─────────────┬─────────────┘
                                  │
                    ┌─────────────▼─────────────┐
                    │   Vuelve a index.html     │
                    └───────────────────────────┘
```

## Flujo Detallado por Funcionalidad

### 1. Flujo de Autenticación

```
Usuario → index.html
    │
    ├─→ Click "Continuar con Google"
    │
    ├─→ Ingresa email
    │
    ├─→ Sistema verifica en BD
    │
    ├─→ ¿Existe?
    │   │
    │   ├─→ SÍ → Login automático → dashboard.html
    │   │
    │   └─→ NO → Muestra formulario registro
    │       │
    │       ├─→ Usuario completa datos
    │       │   - Username
    │       │   - Géneros favoritos
    │       │   - Libros por mes
    │       │   - Autores favoritos
    │       │   - Formato preferido
    │       │
    │       ├─→ Guarda en BD
    │       │
    │       └─→ Redirige a dashboard.html
```

### 2. Flujo de Registro de Libro

```
Usuario → dashboard.html
    │
    ├─→ Click "Registrar Libro"
    │
    ├─→ register-book.html
    │
    ├─→ Completa formulario
    │   - Título *
    │   - Autor *
    │   - ISBN (opcional)
    │   - Fecha ingreso *
    │   - Estado lectura *
    │   - Calificación * (estrellas)
    │   - Reseña (opcional)
    │
    ├─→ Click "Guardar"
    │
    ├─→ Validación campos
    │
    ├─→ Guarda en BD
    │
    └─→ Opciones:
        ├─→ Volver a dashboard.html
        └─→ Ir a view-books.html
```

### 3. Flujo de Visualización y Edición

```
Usuario → dashboard.html
    │
    ├─→ Click "Ver Libros"
    │
    ├─→ view-books.html
    │
    ├─→ Carga lista de libros desde BD
    │
    ├─→ Usuario puede:
    │   │
    │   ├─→ Buscar (filtro en tiempo real)
    │   │
    │   ├─→ Ver detalles de cada libro
    │   │
    │   ├─→ Click "Editar"
    │   │   │
    │   │   ├─→ Abre modal
    │   │   │
    │   │   ├─→ Prellena formulario
    │   │   │
    │   │   ├─→ Usuario modifica
    │   │   │
    │   │   ├─→ Click "Guardar Cambios"
    │   │   │
    │   │   └─→ Actualiza en BD
    │   │
    │   └─→ Click "Eliminar"
    │       │
    │       ├─→ Confirmación
    │       │
    │       └─→ Elimina de BD
```

### 4. Flujo de Recomendaciones

```
Usuario → dashboard.html
    │
    ├─→ Click "Recomendaciones por IA"
    │
    ├─→ recommendations.html
    │
    ├─→ Carga automática:
    │   │
    │   ├─→ Obtiene preferencias usuario
    │   │
    │   ├─→ Obtiene historial lectura
    │   │
    │   ├─→ Genera recomendaciones
    │   │
    │   └─→ Muestra tarjetas
    │
    ├─→ Usuario puede:
    │   │
    │   ├─→ Ver recomendaciones
    │   │
    │   ├─→ Click "Registrar Libro"
    │   │   │
    │   │   ├─→ Redirige a register-book.html
    │   │   │
    │   │   └─→ Prellena título y autor
    │   │
    │   └─→ Click "Generar Nuevas"
    │       │
    │       └─→ Regenera recomendaciones
```

## Matriz de Estados y Transiciones

| Estado Actual | Acción | Estado Siguiente | Condición |
|--------------|--------|------------------|-----------|
| No autenticado | Login exitoso | Dashboard | Usuario existe |
| No autenticado | Registro | Dashboard | Formulario completo |
| Dashboard | Registrar libro | Register Book | - |
| Dashboard | Ver libros | View Books | - |
| Dashboard | Recomendaciones | Recommendations | - |
| Dashboard | Cerrar sesión | Index | - |
| Register Book | Guardar | Dashboard/View Books | Validación OK |
| Register Book | Cancelar | Dashboard | - |
| View Books | Editar | Modal Editar | - |
| View Books | Eliminar | View Books | Confirmación |
| View Books | Buscar | View Books (filtrado) | - |
| Recommendations | Registrar | Register Book | Con datos prellenados |
| Recommendations | Generar nuevas | Recommendations | - |
| Cualquiera | Cerrar sesión | Index | - |

## Niveles de Acceso

```
┌─────────────────────────────────────┐
│     PÁGINAS PÚBLICAS                │
│                                     │
│  • index.html (Login/Registro)      │
└─────────────────────────────────────┘
              │
              │ Autenticación exitosa
              ▼
┌─────────────────────────────────────┐
│   PÁGINAS PROTEGIDAS                │
│   (Requieren autenticación)         │
│                                     │
│  • dashboard.html                   │
│  • register-book.html               │
│  • view-books.html                 │
│  • recommendations.html             │
└─────────────────────────────────────┘
```

## Componentes de Navegación

### Barra de Navegación (Presente en todas las páginas protegidas)

```
┌─────────────────────────────────────────────────────────────┐
│ [📚 BiblioSmart]                    [👤 Usuario] [🚪 Salir]  │
└─────────────────────────────────────────────────────────────┘
```

### Menú de Navegación (Dashboard)

```
┌─────────────────────────────────────────────────────────────┐
│  [📖 Registrar]  [📚 Ver Libros]  [🤖 Recomendaciones]    │
└─────────────────────────────────────────────────────────────┘
```

### Breadcrumbs (Navegación contextual)

```
Dashboard > Ver Libros > Editar: [Título del Libro]
Dashboard > Recomendaciones > Registrar: [Título Recomendado]
```







