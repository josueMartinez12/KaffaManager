const Product = require('../models/Product');

// 1. Ver qué productos hay y cuánto stock tienen
exports.getCurrentStock = async (req, res) => {
    try {
        const productos = await Product.find().select('nombre stock precio');
        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el stock", error: error.message });
    }
};

// 2. Ajustar Stock (Entradas y Salidas)
exports.adjustStock = async (req, res) => {
    try {
        const { productoId, cantidad, tipo } = req.body; // tipo: 'Entrada' o 'Salida'
        const cambio = tipo === 'Entrada' ? cantidad : -cantidad;

        const producto = await Product.findByIdAndUpdate(
            productoId,
            { $inc: { stock: cambio } },
            { new: true }
        );

        if (!producto) return res.status(404).json({ message: "Producto no encontrado" });

        res.json({ message: `Stock actualizado. Nuevo stock: ${producto.stock}`, producto });
    } catch (error) {
        res.status(500).json({ message: "Error al ajustar stock", error: error.message });
    }
};

// 3. Ver historial (Simulado por ahora para que no de error)
exports.getInventoryHistory = async (req, res) => {
    try {
        res.json({ message: "Historial de movimientos (Funcionalidad en desarrollo)" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4. Alertas de stock bajo
exports.getLowStockAlerts = async (req, res) => {
    try {
        const limiteBajo = 10;
        const alertas = await Product.find({ stock: { $lt: limiteBajo } }).select('nombre stock');
        res.json({ message: "Productos con stock bajo", alertas });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};