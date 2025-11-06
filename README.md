# Bookstore Inventory API

API REST con NestJS, Docker y PostgreSQL para gestión de inventario de librería.

## Requisitos

- Docker Desktop
- VSCode con extensión "Dev Containers" (recomendado)

## Inicio Rápido

### Opción 1: Con Dev Containers (Recomendado)

1. Abrir el proyecto en VSCode
2. Presionar `F1` y seleccionar: **"Dev Containers: Reopen in Container"**
3. Esperar a que se construya el contenedor
4. ¡Listo! Trabajas directamente dentro del contenedor

**Ventajas:**

- IntelliSense completo
- Un solo `node_modules`
- Terminal integrada ejecuta en el contenedor
- Instalas dependencias una sola vez: `npm install <paquete>`

### Opción 2: Sin Dev Containers

```bash
# Clonar
git clone <url-del-repositorio>
cd bookstore-inventory-api

# Levantar
docker-compose up -d
```

API disponible en `http://localhost:3000`
Swagger en `http://localhost:3000/api`

## Comandos Docker

```bash
# Levantar servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down

# Reconstruir
docker-compose up -d --build
```

## Comandos en Contenedor

```bash
# Terminal
docker-compose exec app sh

# Tests
docker-compose exec app npm run test

# Lint
docker-compose exec app npm run lint

# PostgreSQL
docker-compose exec postgres psql -U postgres -d bookstore
```

## Variables de Entorno

Archivo `.env`:

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

`DB_HOST` debe ser `postgres` (nombre del servicio en docker-compose)

## Licencia

MIT
