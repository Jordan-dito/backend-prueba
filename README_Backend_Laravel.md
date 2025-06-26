# Informe de Entrega – Backend Laravel

## ✅ Información general

**Proyecto:** Prueba Técnica – Administración de Usuarios  
**Tecnología:** Laravel 10 (PHP 8.x), MySQL (XAMPP), Artisan CLI  
**Base de datos:** `prueba`  
**Servidor local:** http://127.0.0.1:8000

---

## 📁 Estructura de tablas y migraciones

### Tabla `users`
- usuario (string)
- email (string, único)
- password (string, encriptado)
- primerNombre, segundoNombre, primerApellido, segundoApellido
- idDepartamento (relación con departamentos)
- idCargo (relación con cargos)

### Tabla `departamentos`
- id, codigo, nombre, activo, idUsuarioCreacion, timestamps

### Tabla `cargos`
- id, codigo, nombre, activo, idUsuarioCreacion, timestamps

---

## 🔗 Endpoints de la API

| Método | Ruta                      | Descripción              |
|--------|---------------------------|--------------------------|
| GET    | /api/usuarios             | Listar todos los usuarios |
| POST   | /api/usuarios             | Crear nuevo usuario      |
| GET    | /api/usuarios/{id}        | Ver usuario por ID       |
| PUT    | /api/usuarios/{id}        | Actualizar usuario       |
| DELETE | /api/usuarios/{id}        | Eliminar usuario         |
| GET    | /api/departamentos        | Listar departamentos     |
| GET    | /api/cargos               | Listar cargos            |

---

## 🛠️ Cómo correr el proyecto

1. Asegúrate de tener instalado:
   - PHP 8.x
   - Composer
   - XAMPP con MySQL activado

2. Clona o copia el proyecto dentro de `C:\xampp\htdocs`

3. Instala dependencias:

```bash
composer install
```

4. Copia el archivo `.env.example` a `.env` y configúralo así:

```
DB_DATABASE=prueba
DB_USERNAME=root
DB_PASSWORD=
```

5. Ejecuta las migraciones y seeders:

```bash
php artisan migrate:fresh --seed
```

6. Inicia el servidor:

```bash
php artisan serve
```

Accede desde:  
http://localhost:8000

---

## 🧪 Cómo probar con Postman

### GET usuarios

```
GET http://localhost:8000/api/usuarios
```

### POST usuario

```
POST http://localhost:8000/api/usuarios
```

Body → raw → JSON:

```json
{
  "usuario": "nuevo01",
  "email": "nuevo@email.com",
  "password": "clave123",
  "primerNombre": "Mario",
  "primerApellido": "Lopez",
  "idDepartamento": 1,
  "idCargo": 1
}
```

### GET un usuario

```
GET http://localhost:8000/api/usuarios/1
```

### PUT usuario

```
PUT http://localhost:8000/api/usuarios/1
```

### DELETE usuario

```
DELETE http://localhost:8000/api/usuarios/1
```

### Departamentos

```
GET http://localhost:8000/api/departamentos
```

### Cargos

```
GET http://localhost:8000/api/cargos
```
