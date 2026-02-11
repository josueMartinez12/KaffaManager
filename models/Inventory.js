const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Se conecta con tu modelo de Producto
        required: true
    },
    tipo: {
        type: String,
        enum: ['Entrada', 'Salida', 'Ajuste'], // Entrada por compra, Salida por venta, Ajuste manual
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    motivo: {
        type: String, // Ejemplo: "Nuevo lote de tostado", "Corrección de inventario", "Venta"
        required: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Quién realizó el movimiento (Admin o Tostador)
    }
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);