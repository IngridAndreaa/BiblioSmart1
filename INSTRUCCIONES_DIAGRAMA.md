# 📐 Instrucciones para Visualizar el Diagrama de Clases

## 🎯 Opciones para Visualizar

### Opción 1: PlantUML Online (Recomendado - Más Rápido)

1. **Abre el navegador** y ve a: http://www.plantuml.com/plantuml/uml/

2. **Abre el archivo** `DIAGRAMA_CLASES.puml` en tu editor

3. **Copia todo el contenido** del archivo

4. **Pega el contenido** en el editor de PlantUML online

5. **¡Listo!** Verás el diagrama generado automáticamente

**Ventajas:**
- ✅ No requiere instalación
- ✅ Genera imágenes PNG/SVG
- ✅ Puedes descargar el diagrama

---

### Opción 2: Extensión PlantUML para VS Code

1. **Instala la extensión** en VS Code:
   - Abre VS Code
   - Ve a Extensiones (Ctrl+Shift+X)
   - Busca: "PlantUML"
   - Instala: "PlantUML" por jebbs

2. **Abre el archivo** `DIAGRAMA_CLASES.puml`

3. **Visualiza el diagrama**:
   - Presiona `Alt+D` para ver la preview
   - O haz clic derecho → "Preview Current Diagram"

**Ventajas:**
- ✅ Visualización en tiempo real
- ✅ Exporta a PNG/SVG
- ✅ Integrado en tu editor

**Nota:** Si no tienes Java instalado, la extensión te pedirá instalarlo.

---

### Opción 3: Mermaid Live Editor (Alternativa)

1. **Abre el archivo** `DIAGRAMA_CLASES.md`

2. **Copia el código Mermaid** (entre ```mermaid y ```)

3. **Ve a:** https://mermaid.live/

4. **Pega el código** en el editor

5. **¡Listo!** Verás el diagrama interactivo

**Ventajas:**
- ✅ Editor interactivo
- ✅ Puedes editar en línea
- ✅ Exporta a PNG/SVG

---

### Opción 4: Visual Studio Code con Markdown Preview

1. **Abre el archivo** `DIAGRAMA_CLASES.md` en VS Code

2. **Instala la extensión** "Markdown Preview Mermaid Support"

3. **Abre la preview** con `Ctrl+Shift+V`

**Ventajas:**
- ✅ Visualiza Mermaid en Markdown
- ✅ Exporta a HTML/PDF

---

### Opción 5: Lucidchart / draw.io (Manual)

1. **Abre Lucidchart** (https://lucid.app/) o **draw.io** (https://app.diagrams.net/)

2. **Crea un nuevo diagrama** tipo UML

3. **Usa el diagrama simplificado** en `DIAGRAMA_CLASES_SIMPLE.md` como guía

4. **Dibuja manualmente** las clases y relaciones

**Ventajas:**
- ✅ Control total del diseño
- ✅ Más profesional para presentaciones
- ✅ Colaboración en equipo

---

## 📊 Archivos Disponibles

### 1. `DIAGRAMA_CLASES.puml`
- **Formato:** PlantUML
- **Uso:** Visualiza en PlantUML online o VS Code
- **Contiene:** Diagrama completo con todas las clases, relaciones y detalles

### 2. `DIAGRAMA_CLASES.md`
- **Formato:** Markdown con código Mermaid
- **Uso:** Visualiza en Mermaid Live Editor o VS Code con extensión
- **Contiene:** Diagrama completo + explicación detallada

### 3. `DIAGRAMA_CLASES_SIMPLE.md`
- **Formato:** Markdown con texto ASCII
- **Uso:** Visualización rápida sin herramientas
- **Contiene:** Diagrama simplificado en texto plano

---

## 🎨 Personalización del Diagrama

### Cambiar Colores (PlantUML)

Edita `DIAGRAMA_CLASES.puml` y agrega al inicio:

```plantuml
skinparam class {
    BackgroundColor #E8F4F8
    BorderColor #2E86AB
    ArrowColor #A23B72
}
```

### Agregar Notas

Puedes agregar notas en el diagrama:

```plantuml
note right of User
  Esta clase representa
  a los usuarios del sistema
end note
```

### Exportar Imágenes

**PlantUML Online:**
1. Haz clic derecho en el diagrama
2. "Save image as" → PNG o SVG

**VS Code:**
1. Abre la preview (Alt+D)
2. Clic derecho → "Export Current Diagram"
3. Elige formato (PNG, SVG, PDF)

---

## 🔧 Solución de Problemas

### Error: "Cannot find Java"

**Solución:**
- Instala Java JDK desde: https://www.java.com/download/
- Reinicia VS Code después de instalar

### El diagrama no se muestra en PlantUML Online

**Solución:**
- Verifica que copiaste TODO el contenido del archivo
- Asegúrate de incluir las líneas `@startuml` y `@enduml`

### Mermaid no se renderiza en VS Code

**Solución:**
- Instala la extensión "Markdown Preview Mermaid Support"
- O usa Mermaid Live Editor en línea

---

## 📝 Estructura del Diagrama

### Componentes Principales:

1. **Modelos de Datos:**
   - User
   - UserPreferences
   - Book

2. **Routers/Controladores:**
   - AuthRouter
   - BooksRouter

3. **Servidor:**
   - App
   - Database

4. **DTOs:**
   - ApiResponse
   - UserDTO
   - BookDTO

### Relaciones:

- **User** → **UserPreferences**: Composición (1:1)
- **User** → **Book**: Agregación (1:N)
- **Book** → **User**: Asociación (N:1)
- Routers → Models: Dependencia
- App → Routers: Composición

---

## ✅ Checklist de Visualización

- [ ] Archivo PlantUML creado (`DIAGRAMA_CLASES.puml`)
- [ ] Archivo Markdown con Mermaid creado (`DIAGRAMA_CLASES.md`)
- [ ] Diagrama simplificado creado (`DIAGRAMA_CLASES_SIMPLE.md`)
- [ ] Instrucciones creadas (`INSTRUCCIONES_DIAGRAMA.md`)
- [ ] Diagrama visualizado correctamente
- [ ] Imagen exportada (opcional)

---

## 🎓 Recursos Adicionales

### PlantUML
- Documentación: https://plantuml.com/class-diagram
- Ejemplos: https://real-world-plantuml.com/

### Mermaid
- Documentación: https://mermaid.js.org/syntax/classDiagram.html
- Live Editor: https://mermaid.live/

### UML
- Tutorial UML: https://www.uml-diagrams.org/
- Notación UML: https://www.uml-diagrams.org/uml-class-diagrams-reference.html

