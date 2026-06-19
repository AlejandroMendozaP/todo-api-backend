# To-Do API REST - Prueba Técnica Backend

API REST construida con Node.js y Express para la gestión de tareas.

---

## Decisiones Técnicas

- **Estructura del Proyecto:** Se optó por una arquitectura limpia dividida en Rutas (`routes`) y Controladores (`controllers`), garantizando la separación de responsabilidades y un código legible.
- **Persistencia:** Siguiendo los criterios de aceptación de la prueba, los datos se almacenan de forma volátil en memoria utilizando un arreglo nativo de JavaScript.
- **Variables de Entorno:** Integración de `.env` empleando la librería `dotenv` para modularizar configuraciones del sistema (como el puerto de escucha y la API Key) sin exponer datos sensibles.
- **Manejo de Errores:** Implementación de códigos de estado HTTP semánticos (400 para peticiones inválidas, 401 para no autorizado y 404 para recursos no encontrados) con respuestas claras en formato JSON.
- **Pruebas Automatizadas:** Integración de `jest` y `supertest` para validar el comportamiento del CRUD y el control de errores de los endpoints en un entorno controlado.
- **Validación de Peticiones:** Integración de `express-validator` para validar las peticiones que llegan al servidor y asegurar que los datos sean correctos.
- **Autenticación (API Key):** Implementación de un middleware personalizado (`apiKeyAuth`) que protege los endpoints de escritura (POST, PUT, DELETE) mediante una API Key enviada en la cabecera `x-api-key`.

---

## Instalación y Ejecución

Sigue estos pasos para clonar, instalar y desplegar el proyecto localmente:

### 1. Clonar el repositorio
```bash
git clone https://github.com/AlejandroMendozaP/todo-api-backend.git
cd todo-api-backend
```

### 2. Instalar dependencias
Asegúrate de tener Node.js instalado y ejecuta:
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto y define las siguientes variables:
```env
PORT=3000
API_KEY=tu_api_key_secreta
```

### 4. Ejecución del Servidor
En modo de desarrollo (con autorecarga usando Nodemon):
```bash
npm run dev
```

En modo de producción:
```bash
npm start
```

El servidor estará escuchando en el puerto configurado (ej: http://localhost:3000).

## Ejecución de Pruebas
Para ejecutar las pruebas automatizadas de integración:
```bash
npm test
```

---

## Endpoints Disponibles

Todos los endpoints de la API tienen el prefijo `/api`.

| Método | Endpoint | Autenticación | Descripción | Body / Query Params |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/tasks` | Pública | Obtiene la lista de todas las tareas. Permite filtrar por estado. | **Query Params:**<br>`completed` (booleano, opcional) |
| `GET` | `/api/tasks/:id` | Pública | Obtiene los detalles de una tarea específica por su ID. | *Ninguno* |
| `POST` | `/api/tasks` | Privada (`x-api-key`) | Crea una nueva tarea. | **Body (JSON):**<br>`title` (obligatorio, string)<br>`description` (opcional, string) |
| `PUT` | `/api/tasks/:id` | Privada (`x-api-key`) | Actualiza el estado (`completed`) de una tarea por su ID. | **Body (JSON):**<br>`completed` (obligatorio, booleano) |
| `DELETE` | `/api/tasks/:id` | Privada (`x-api-key`) | Elimina una tarea por su ID. | *Ninguno* |