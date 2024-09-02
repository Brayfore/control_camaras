Proyecto de Verificación de Cámaras - Clínica San Juan de Dios
Este proyecto es un sistema de control y verificación de cámaras para la Clínica San Juan de Dios. Permite gestionar DVRs (Digital Video Recorders) y registrar las verificaciones diarias.

Requisitos
Node.js
React
Python 3.9+
Django 3.2+
Django REST Framework
Simple JWT
Instalación
Clona este repositorio:

bash
Copiar código
git clone https://github.com/tu-usuario/nombre-del-repositorio.git
Crea un entorno virtual:

bash
Copiar código
python -m venv env
Activa el entorno virtual:

En Windows:
bash
Copiar código
.\env\Scripts\activate
En Unix o MacOS:
bash
Copiar código
source env/bin/activate
Instala las dependencias:

bash
Copiar código
pip install -r requirements.txt
Aplica las migraciones:

bash
Copiar código
python manage.py migrate
Instala las dependencias de Node.js para el frontend:

bash
Copiar código
cd frontend
npm install
Uso
Ejecuta el servidor de desarrollo de Django:

bash
Copiar código
python manage.py runserver
Ejecuta el servidor de desarrollo de React:

bash
Copiar código
cd frontend
npm start
Accede a la aplicación:

Backend API: http://127.0.0.1:8000/api/
Frontend: http://localhost:3000
Endpoints
DVRs
GET /api/dvrs/ - Lista de DVRs.
POST /api/dvrs/ - Crear un DVR.
DELETE /api/dvrs/<id>/ - Eliminar un DVR.
Registros
GET /api/registros/ - Lista de registros.
POST /api/registros/ - Crear un registro.
Configuración de Axios
El archivo de configuración de Axios (apiService.js) está configurado para interactuar con la API del backend. Puedes modificar la base URL si es necesario:

javascript
Copiar código
const API_URL = 'http://127.0.0.1:8000/api';
