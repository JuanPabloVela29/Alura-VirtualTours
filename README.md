# AluraFlix

## Descripción
**AluraFlix** es una aplicación web desarrollada en **React** que permite gestionar videos de walking tours categorizados según temáticas como estaciones, festividades y lugares increíbles. Este proyecto incluye funcionalidades de gestión de videos y categorías, además de un diseño moderno y responsivo.

## Funcionalidades Principales

### Gestión de Videos
1. **Listado de videos:**
   - Muestra todos los videos disponibles categorizados.
   - Permite filtrar videos por categorías específicas.
2. **Agregar videos:**
   - Formulario para agregar un nuevo video con los siguientes campos:
     - Título.
     - Imagen de miniatura (URL).
     - Enlace al video.
     - Categoría (selección de una lista desplegable).
   - Validaciones incluidas para garantizar datos completos.
3. **Editar videos:**
   - Modificación de videos existentes a través de un modal.
   - Edición en tiempo real de campos como título, imagen, enlace, categoría y descripción.
4. **Eliminar videos:**
   - Elimina videos con una confirmación previa mediante SweetAlert para evitar acciones accidentales.

### Gestión de Categorías
1. **Listado de categorías:**
   - Visualización de todas las categorías disponibles.
2. **Crear nuevas categorías:**
   - Formulario que permite agregar nuevas categorías con validaciones.
3. **Editar categorías:**
   - Modificación de categorías existentes con validaciones integradas.
4. **Eliminar categorías:**
   - Opción de eliminar categorías con confirmación previa.

### Navegación
- Implementación de rutas dinámicas con **React Router** para una experiencia fluida.
- Navegación intuitiva y estructurada en una **Single Page Application (SPA)**.

### Estilo y Responsividad
- Diseño estilizado utilizando **Material UI**.
- Completamente responsivo para dispositivos móviles, tablets y escritorio.
- Íconos animados y mejorados con Material Icons.

## Tecnologías Utilizadas

### Frontend
- **React**: Biblioteca principal para la creación de la interfaz.
- **React Router**: Manejo de rutas dinámicas.
- **Material UI**: Estilización y componentes prediseñados.
- **SweetAlert**: Confirmaciones interactivas.

### Backend
- **JSON Server**: Servidor simulado para la manipulación de datos.
  - **Rutas del backend:**
    - Videos: `http://localhost:5000/videos`
    - Categorías: `http://localhost:5001/categorias`

### Otros
- **Hooks personalizados:** Implementación para mejorar la gestión de estado y lógica reutilizable.
- **Librerías de generación de IDs únicos:** Garantiza identificadores consistentes para videos y categorías.

## Estructura del Proyecto
```
AluraFlix/
├── public/
├── src/
│   ├── components/
│   │   ├── categoria/
│   │   ├── categorias/
│   │   ├── editmodal/
│   │   ├── footer/
│   │   ├── header/
│   │   ├── nuevacategoria/
│   │   ├── nuevovideo/
│   │   ├── tarjetavideo/
│   │   ├── videoplayermodal/
│   └── App.js
│   └── index.js
├── data/
│   ├── categories.json
│   └── db.json
└── README.md
```

## Cómo Ejecutar el Proyecto

### Requisitos Previos
- **Node.js** instalado.
- **npm** o **yarn** como gestor de paquetes.

### Pasos
1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/aluraflix.git
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor JSON:
   ```bash
   json-server --watch db.json --port 5000
   json-server --watch db.json --port 5001
   ```
4. Inicia la aplicación:
   ```bash
   npm start
   ```
5. Accede a la aplicación en [http://localhost:3000](http://localhost:3000).

## Autor
Desarrollado por [Juan Pablo Velásquez].
