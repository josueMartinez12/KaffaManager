const Invoice = require('../models/Invoice');
const Sale = require('../models/Sale');
const Product = require('../models/Product');


// 1. PROCESAR VENTA (POST)
exports.processSale = async (req, res) => {
    const { items, cliente, total, metodoPago } = req.body;
    try {
        // Validación de stock previa
        for (const item of items) {
            const prod = await Product.findById(item.producto);
            if (!prod || prod.stockActual < item.cantidad) {
                return res.status(400).json({ message: `Stock insuficiente para ${prod ? prod.nombre : 'producto desconocido'}` });
            }
        }

        const numFactura = `INV-${Date.now()}`;
        const factura = new Invoice({ numeroFactura: numFactura, cliente, items, total, metodoPago });
        await factura.save();

        const venta = new Sale({ invoice: factura._id, montoTotal: total });
        await venta.save();

        // Descontar inventario
        for (const item of items) {
            await Product.findByIdAndUpdate(item.producto, {
                $inc: { stockActual: -item.cantidad }
            });
        }

        res.status(201).json({ message: "Venta exitosa", factura });
    } catch (error) {
        res.status(500).json({ message: "Error al procesar venta", error: error.message });
    }
};

// 2. OBTENER TODAS LAS VENTAS (GET)
exports.getSales = async (req, res) => {
    try {
        const ventas = await Sale.find().populate('invoice');
        res.json(ventas);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener ventas" });
    }
};

// 3. CANCELAR VENTA (PUT) - Devuelve el stock
exports.cancelSale = async (req, res) => {
    try {
        const { id } = req.params;
        const factura = await Invoice.findById(id);
        
        if (!factura || factura.estado === 'Cancelado') {
            return res.status(400).json({ message: "Factura no encontrada o ya cancelada" });
        }

        // Devolver stock al inventario
        for (const item of factura.items) {
            await Product.findByIdAndUpdate(item.producto, {
                $inc: { stockActual: item.cantidad }
            });
        }

        factura.estado = 'Cancelado';
        await factura.save();

        res.json({ message: "Venta cancelada y stock restaurado" });
    } catch (error) {
        res.status(500).json({ message: "Error al cancelar venta" });
    }
};

// 4. ELIMINAR REGISTRO (DELETE)
exports.deleteSale = async (req, res) => {
    try {
        await Sale.findOneAndDelete({ invoice: req.params.id });
        await Invoice.findByIdAndDelete(req.params.id);
        res.json({ message: "Registro eliminado de la base de datos" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar" });
    }
};