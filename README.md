# Bookstore Inventory API

API REST con NestJS, Docker y PostgreSQL para gestión de inventario de librería.

## Requisitos

- **Windows/Mac:** [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- **Linux:** [Docker Engine](https://docs.docker.com/engine/install/) y [Docker Compose](https://docs.docker.com/compose/install/)

## Cómo ejecutar el proyecto

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd bookstore-inventory-api
```

### 2. Crear archivo `.env`

Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
NODE_ENV=development
PORT=3000
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=bookstore
DB_SYNCHRONIZE=true
DB_LOGGING=true
```

### 3. Levantar los servicios

```bash
docker-compose up -d
```

### 4. ¡Listo!

- **API:** http://localhost:3000
- **Documentación (Swagger):** http://localhost:3000/api

## Detener el proyecto

```bash
docker-compose down
```

## Poblar la Base de Datos (Seeder)

Si la base de datos está vacía, puedes poblarla con datos de prueba ejecutando:

```bash
curl -X POST http://localhost:3000/seeder
```

O usando PowerShell:

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/seeder" -Method POST
```

Esto creará automáticamente:

- **7 categorías** (Programming, Science Fiction, Business, Self-Help, Technology, History, Philosophy)
- **30 libros** distribuidos en todas las categorías

El seeder es **seguro para ejecutar múltiples veces**. Detecta duplicados automáticamente:

- Categorías: verifica por nombre
- Libros: verifica por ISBN

## Endpoints Principales

- `POST /seeder` - Poblar base de datos con datos de prueba
- `GET /books` - Listar libros (con paginación)
- `POST /books` - Crear libro
- `GET /books/:id` - Obtener libro por ID
- `PUT /books/:id` - Actualizar libro
- `DELETE /books/:id` - Eliminar libro
- `GET /books/search?category=Programming` - Buscar por categoría
- `GET /books/low-stock?threshold=10` - Libros con stock bajo
- `POST /books/:id/calculate-price` - Calcular precio sugerido

Para ver todos los endpoints disponibles, visita la documentación en http://localhost:3000/api

### Nota

Aunque la colección de Postman es útil para probar los endpoints, recomiendo usar **Swagger** para explorar y probar la API de manera más interactiva. Swagger está disponible en: [http://localhost:3000/api](http://localhost:3000/api).

## Colección de Postman

El proyecto incluye una colección de Postman con todas las peticiones a los endpoints implementados:

### Importar la colección

1. Abre **Postman**
2. Click en **"Import"**
3. Selecciona el archivo `Bookstore-Inventory-API.postman_collection.json`
4. La colección usa la variable `{{base_url}}` configurada en `http://localhost:3000`

### Contenido de la colección

**Seeder (1 endpoint):**

- Seed Database (poblar BD con datos de prueba)

**Books (8 endpoints):**

- Create Book
- Get All Books
- Get Book by ID
- Update Book
- Delete Book
- Search by Category
- Low Stock Books
- Calculate Suggested Price

**Categories (5 endpoints):**

- Create Category
- Get All Categories
- Get Category by ID
- Update Category
- Delete Category

Todas las peticiones incluyen ejemplos de body, parámetros documentados y valores de ejemplo.

## Comandos Útiles

```bash
# Ver logs en tiempo real
docker-compose logs -f app

# Reiniciar la aplicación
docker-compose restart app

# Reconstruir contenedores (después de cambios en Dockerfile)
docker-compose up -d --build
```

## Tecnologías

- **NestJS** - Framework backend
- **TypeORM** - ORM para PostgreSQL
- **PostgreSQL** - Base de datos
- **Docker** - Contenedorización
- **Swagger** - Documentación API
