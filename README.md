# 📚 Bookstore Inventory API

API REST desarrollada con NestJS para la gestión de inventario de una librería. Incluye configuración completa con Docker y PostgreSQL.

## 🚀 Características

- ✅ Framework NestJS con TypeScript
- ✅ Base de datos PostgreSQL con TypeORM
- ✅ Dockerizado (desarrollo y producción)
- ✅ Variables de entorno configurables
- ✅ Hot reload en desarrollo
- ✅ ESLint y Prettier configurados

## 📋 Requisitos Previos

- **Node.js** >= 18.x
- **npm** >= 9.x
- **Docker** y **Docker Compose** (opcional pero recomendado)

## 🛠️ Instalación

### Opción 1: Con Docker (Recomendado)

1. **Clonar el repositorio**

```bash
git clone <url-del-repositorio>
cd bookstore-inventory-api
```

2. **Configurar variables de entorno**

```bash
cp .env.example .env
```

3. **Levantar los contenedores**

```bash
docker-compose up -d
```

La API estará disponible en `http://localhost:3000`

### Opción 2: Sin Docker

1. **Instalar dependencias**

```bash
npm install
```

2. **Configurar variables de entorno**

```bash
cp .env.example .env
```

Asegúrate de tener PostgreSQL instalado y actualiza las credenciales en `.env`

3. **Ejecutar en modo desarrollo**

```bash
npm run start:dev
```

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm run start          # Inicia la aplicación
npm run start:dev      # Inicia con hot-reload
npm run start:debug    # Inicia en modo debug

# Compilación
npm run build          # Compila el proyecto

# Producción
npm run start:prod     # Inicia en modo producción

# Calidad de código
npm run lint           # Ejecuta ESLint
npm run format         # Formatea el código con Prettier

# Testing
npm run test           # Ejecuta tests unitarios
npm run test:e2e       # Ejecuta tests end-to-end
npm run test:cov       # Genera reporte de cobertura
```

## 🐳 Comandos Docker

```bash
# Levantar servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down

# Reconstruir imágenes
docker-compose up -d --build

# Ejecutar comandos en el contenedor
docker-compose exec app npm run migration:run
```

## 🔧 Configuración

### Variables de Entorno

El archivo `.env` contiene la siguiente configuración:

```env
# Aplicación
NODE_ENV=development
PORT=3000

# Base de datos
DB_HOST=localhost          # Usar 'postgres' si se usa Docker
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=bookstore
DB_SYNCHRONIZE=true        # Solo en desarrollo
DB_LOGGING=true
```

⚠️ **Importante**: En producción, establece `DB_SYNCHRONIZE=false` y usa migraciones.

## 📁 Estructura del Proyecto

```
bookstore-inventory-api/
├── src/
│   ├── config/              # Configuraciones
│   │   └── typeorm.config.ts
│   ├── app.controller.ts    # Controlador principal
│   ├── app.module.ts        # Módulo raíz
│   ├── app.service.ts       # Servicio principal
│   └── main.ts              # Punto de entrada
├── test/                    # Tests
├── .env.example             # Plantilla de variables de entorno
├── .dockerignore
├── docker-compose.yml       # Configuración Docker Compose
├── Dockerfile               # Dockerfile multi-stage
├── nest-cli.json
├── package.json
├── tsconfig.json
└── README.md
```

## 🧪 Testing

```bash
# Tests unitarios
npm run test

# Tests e2e
npm run test:e2e

# Cobertura de tests
npm run test:cov
```

## 🔍 Endpoints Disponibles

Por defecto, NestJS incluye un endpoint de ejemplo:

- **GET** `/` - Retorna "Hello World!"

## 📝 Próximos Pasos

Ahora puedes empezar a desarrollar tu API:

1. Crear entidades (modelos de base de datos)
2. Crear módulos para diferentes recursos (libros, autores, etc.)
3. Implementar controladores y servicios
4. Agregar validación con class-validator
5. Implementar autenticación y autorización
6. Agregar migraciones de base de datos

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

Desarrollado con ❤️ usando [NestJS](https://nestjs.com/)
