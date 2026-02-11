const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nombre: { type: String, required: true }, // [cite: 42]
    categoria: { 
        type: String, 
        required: true, 
        enum: ['Grano', 'Accesorios', 'Método'] // [cite: 44, 73]
    },
    precio: { type: Number, required: true, default: 0 }, // [cite: 49, 98]
    descripcion: { type: String }, // [cite: 46]
    urlImagen: { type: String }, // [cite: 48, 105]
    stockActual: { type: Number, default: 0 }, // [cite: 131]
    puntoReorden: { type: Number, default: 10 }, // [cite: 132]
    unidad: { type: String, default: 'Unidades' } // Ej: "Bolsas (340g)" [cite: 133, 140]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);