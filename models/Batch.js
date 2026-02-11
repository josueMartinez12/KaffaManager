const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
    codigo: { type: String, required: true, unique: true }, // Ej: TOST-2024-001 [cite: 238]
    granoOrigen: { type: String, required: true }, // [cite: 251]
    tempInicial: { type: Number }, // [cite: 253]
    tempFinal: { type: Number }, // [cite: 254]
    tiempoMin: { type: Number }, // [cite: 255]
    nivelTueste: { 
        type: String, 
        enum: ['Claro', 'Medio', 'Oscuro'] // [cite: 256, 257]
    }
}, { timestamps: true });

module.exports = mongoose.model('Batch', batchSchema);