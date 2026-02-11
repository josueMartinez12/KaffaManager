const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    nombreFinca: { type: String, required: true }, // [cite: 290, 291]
    ubicacion: { type: String }, // Ej: Santa Ana, Boquete [cite: 292, 300]
    contacto: { type: String }, // Nombre del productor [cite: 293, 301]
    altitud: { type: String }, // Ej: "1450 msnm" [cite: 302]
    email: { type: String } // [cite: 304, 340]
}, { timestamps: true });

module.exports = mongoose.model('Supplier', supplierSchema);