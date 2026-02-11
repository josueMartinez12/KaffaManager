const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    invoice: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' },
    montoTotal: { type: Number, required: true },
    gananciaNeta: { type: Number }, // Calculado: Precio Venta - Costo Producción
    fecha: { type: Date, default: Date.now },
    vendedor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Quién procesó la venta
    canal: { type: String, enum: ['Tienda', 'Online'], default: 'Online' }
}, { timestamps: true });

module.exports = mongoose.model('Sale', saleSchema);