const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    cliente: { type: String, required: true },
    total: { type: Number, required: true },
    metodoPago: { type: String },
    // AGREGA ESTO:
    items: [{
        productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        cantidad: { type: Number, required: true }
    }],
    estado: { 
        type: String, 
        enum: ['Pendiente', 'Pagado', 'Enviado', 'Entregado'], 
        default: 'Pendiente'
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);