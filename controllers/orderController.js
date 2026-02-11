const Order = require('../models/Order');
const Product = require('../models/Product');

// 1. Crear una nueva orden con actualización de stock
exports.createOrder = async (req, res) => {
    try {
        const { cliente, items, total, metodoPago } = req.body;

        // Validación preventiva
        if (!items || !Array.isArray(items)) {
            return res.status(400).json({ message: "La orden debe contener una lista de items." });
        }

        // --- VALIDACIÓN DE STOCK ---
        // Verificamos si hay suficiente stock de todos los productos antes de hacer nada
        for (const item of items) {
            const producto = await Product.findById(item.productoId);
            
            if (!producto) {
                return res.status(404).json({ message: `Producto con ID ${item.productoId} no encontrado` });
            }

            if (producto.stock < item.cantidad) {
                return res.status(400).json({ 
                    message: `Stock insuficiente para ${producto.nombre}. Disponible: ${producto.stock}` 
                });
            }
        }

        // --- ACTUALIZACIÓN DE INVENTARIO ---
        // Si todos tienen stock, procedemos a restar
        const promesasActualizacion = items.map(item => {
            return Product.findByIdAndUpdate(
                item.productoId,
                { $inc: { stock: -item.cantidad } }
            );
        });
        
        await Promise.all(promesasActualizacion);

        // --- CREACIÓN DE LA ORDEN ---
        const nuevaOrden = new Order({
            cliente,
            items,
            total,
            metodoPago,
            estado: 'Pendiente'
        });

        await nuevaOrden.save();
        res.status(201).json(nuevaOrden);

    } catch (error) {
        console.error("Error al crear orden:", error);
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};

// 2. Obtener todas las órdenes
exports.getOrders = async (req, res) => {
    try {
        const ordenes = await Order.find().sort({ createdAt: -1 });
        res.json(ordenes);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las órdenes" });
    }
};

// 3. Actualizar el estado de la orden
exports.updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;

    try {
        const ordenActualizada = await Order.findByIdAndUpdate(
            id,
            { estado },
            { new: true }
        );

        if (!ordenActualizada) {
            return res.status(404).json({ message: "Orden no encontrada" });
        }

        res.json({ message: `Orden marcada como ${estado}`, ordenActualizada });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar estado" });
    }
};

// 4. Obtener detalle de una orden específica
exports.getOrderById = async (req, res) => {
    try {
        const orden = await Order.findById(req.params.id);
        if (!orden) return res.status(404).json({ message: "No se encontró la orden" });
        res.json(orden);
    } catch (error) {
        res.status(404).json({ message: "ID no válido o error de búsqueda" });
    }
};