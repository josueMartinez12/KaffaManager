const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const apiRoutes = require('./routes'); 

// 1. IMPORTA LA FUNCIÓN DE CONFIGURACIÓN INICIAL
const { createAdmin } = require('./libs/initialSetup'); 

dotenv.config();

// Conexión a la base de datos
connectDB().then(() => {
    // 2. EJECUTA LA FUNCIÓN DE CREACIÓN DE ADMIN
    // Es mejor hacerlo dentro del .then para asegurar que la DB esté lista
    createAdmin(); 
});

const app = express();

// --- CONFIGURACIÓN DE MIDDLEWARES ---

// Para Render, puedes dejar cors() así para desarrollo, 
// o poner la URL de tu frontend cuando la tengas
app.use(cors()); 

app.use(morgan('dev')); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// --- RUTAS ---

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.send('🚀 API de Kaffa Manager funcionando correctamente...');
});

// Manejo de rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ message: "Ruta no encontrada" });
});

// --- ARRANCAR SERVIDOR ---

// Render detectará automáticamente el puerto mediante process.env.PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor corriendo en puerto: ${PORT}`);
});