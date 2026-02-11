const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    numeroFactura: { type: String, required: true, unique: true }, // Ej: FAC-0001
    orden: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: false },
    cliente: {
        nombre: String,
        email: String,
        nit: String // O número de identificación fiscal
    },
    items: [{
        producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        nombre: String,
        cantidad: Number,
        precioUnitario: Number,
        subtotal: Number
    }],
    total: { type: Number, required: true },
    metodoPago: { type: String, enum: ['Credit Card', 'PayPal', 'Efectivo'], default: 'Credit Card' },
    fechaEmision: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Invoice', invoiceSchema);