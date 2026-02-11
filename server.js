const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const apiRoutes = require('./routes'); 

// 1. IMPORTA LA FUNCIÓN (Asegúrate de que la ruta al archivo sea correcta)
const { createAdmin } = require('./libs/initialSetup'); 

dotenv.config();
connectDB();

// 2. EJECUTA LA FUNCIÓN
// Se recomienda llamarla justo después de conectar a la DB
createAdmin(); 

const app = express();

app.use(cors()); 
app.use(morgan('dev')); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.send('API de Kaffa Manager funcionando correctamente...');
});

app.use((req, res, next) => {
    res.status(404).json({ message: "Ruta no encontrada" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto: ${PORT}`);
});