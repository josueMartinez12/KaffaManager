const Product = require('../models/Product');

// 1. Ver qué productos hay y cuánto stock tienen
// Para obtener
exports.getCurrentStock = async (req, res) => {
    try {
        const productos = await Product.find().select('nombre stock precio');
        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: "Error", error: error.message });
    }
};

// Para actualizar
exports.adjustStock = async (req, res) => {
    try {
        const { productoId, cantidad, tipo } = req.body;
        const cambio = tipo === 'Entrada' ? parseInt(cantidad) : -parseInt(cantidad);

        const producto = await Product.findByIdAndUpdate(
            productoId,
            { $inc: { stock: cambio } }, // Ahora sí funcionará el $inc
            { new: true }
        );
        res.json(producto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. Ajustar Stock (Entradas y Salidas)
exports.adjustStock = async (req, res) => {
    try {
        const { productoId, cantidad, tipo } = req.body; 

        // VALIDACIÓN: Asegurar que los datos existan
        if (!productoId || cantidad === undefined || !tipo) {
            return res.status(400).json({ message: "Faltan datos: productoId, cantidad y tipo son obligatorios." });
        }

        // CONVERSIÓN: Asegurar que cantidad sea un número entero
        const numCantidad = parseInt(cantidad);
        if (isNaN(numCantidad) || numCantidad <= 0) {
            return res.status(400).json({ message: "La cantidad debe ser un número válido mayor a cero." });
        }

        // LÓGICA: Determinar si sumamos o restamos
        const cambio = tipo === 'Entrada' ? numCantidad : -numCantidad;

        // ACTUALIZACIÓN: Usar findByIdAndUpdate con el operador $inc
        const producto = await Product.findByIdAndUpdate(
            productoId,
            { $inc: { stock: cambio } },
            { new: true, runValidators: true } // runValidators asegura que el stock no rompa reglas del modelo
        );

        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado en la base de datos." });
        }

        // RESPUESTA: Éxito
        res.json({ 
            message: `Stock actualizado correctamente.`, 
            nuevoStock: producto.stock,
            producto 
        });

    } catch (error) {
        console.error("Error en adjustStock:", error);
        res.status(500).json({ message: "Error interno al ajustar stock", error: error.message });
    }
};

// 3. Ver historial (Simulado)
exports.getInventoryHistory = async (req, res) => {
    try {
        // En el futuro, aquí buscarías en la colección 'Inventory'
        res.json({ message: "Historial de movimientos (Funcionalidad en desarrollo)" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4. Alertas de stock bajo
exports.getLowStockAlerts = async (req, res) => {
    try {
        const limiteBajo = 10;
        // Buscamos productos cuyo stock sea menor al límite
        const alertas = await Product.find({ stock: { $lt: limiteBajo } }).select('nombre stock');
        
        res.json({ 
            count: alertas.length,
            alertas 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};