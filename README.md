# BinSmart

BinSmart es una solución para el escaneo y clasificación de residuos pensada como un pequeño ecosistema: un backend RESTful y dos clientes (una app para tablet como aplicación principal y una app móvil incluida como demo/prototipo).

## Qué contiene este repositorio

- `server/` - API REST (Node.js / Express) con controladores, rutas, modelos y servicios (p. ej. integración con Hugging Face para clasificación). Maneja usuarios, escaneos, canjes y QR.
- `tablet/` - Aplicación principal (React Native + Expo) orientada a tablets. Contiene pantallas para escaneo, historial, métricas y gestión de QR. 
- `mobile/` - App móvil (React Native + Expo) incluida como demo/prototipo. Contiene pantallas de cámara, login y resultados. No se considera la app de producción.

## Tecnologías usadas

- Backend: Node.js, Express
- Base de datos: (configurable desde `server/src/config/db.js`) — espera variables de entorno para la conexión
- Integraciones: Hugging Face (servicio de clasificación) — ver `server/src/service/huggingfaceService.js`
- Mobile/Tablet: React Native con Expo
- Autenticación: Middleware en `server/src/middleware/auth.js`


## Endpoints principales (resumen)

- `/api/qr` — generación/lectura de QR
- `/api/escaneos` — registrar y listar escaneos (historial)
- `/api/canjes` — gestionar canjes y su historial
- `/api/classification` — endpoint de clasificación (usa Hugging Face)
- `/api/usuario` — registro, login y gestión de usuarios

(Consulta los archivos en `server/src/routes` para ver métodos HTTP y parámetros exactos.)

## Cómo ejecutar (rápido)

Requisitos: Node.js y, para las apps, Expo CLI si usas el cliente local.

- Backend (server):

cd server
npm install
# si existe script dev (nodemon)
npm run dev
# o
npm start

- Tablet (app principal):

cd tablet
npm install
expo start


- Mobile (demo):

cd mobile
npm install
expo start


Nota: revisa `tablet/src/services/api.js` y `mobile/src/services/api.js` para configurar la URL base del backend antes de probar.

## Variables de entorno importantes

Configura un archivo `.env` en `server/` con al menos:

- `MONGO_URI` o la variable que uses para la BD
- `JWT_SECRET` para tokens
- `HUGGINGFACE_API_KEY` (si aplica)
- `PORT` (opcional)

