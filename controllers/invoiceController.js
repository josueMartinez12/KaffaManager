const Invoice = require('../models/Invoice');

// 1. Crear factura (POST)
exports.createInvoice = async (req, res) => {
    try {
        const nuevaFactura = new Invoice(req.body);
        // El número de factura se puede generar automáticamente si no viene en el body
        if (!nuevaFactura.numeroFactura) {
            nuevaFactura.numeroFactura = `FAC-${Date.now()}`;
        }
        await nuevaFactura.save();
        res.status(201).json(nuevaFactura);
    } catch (error) {
        res.status(400).json({ message: "Error al crear la factura", error: error.message });
    }
};

// 2. Obtener todas las facturas (GET - Historial)
exports.getInvoices = async (req, res) => {
    try {
        const facturas = await Invoice.find().sort({ createdAt: -1 });
        res.json(facturas);
    } catch (error) {
        res.status(500).json({ message: "Error al listar facturas" });
    }
};

// 3. Obtener factura por ID (GET)
exports.getInvoiceById = async (req, res) => {
    try {
        // .populate('items.producto') permite traer los datos del producto (nombre, precio, etc)
        const factura = await Invoice.findById(req.params.id).populate('items.producto');
        
        if (!factura) return res.status(404).json({ message: "Factura no encontrada" });
        res.json(factura);
    } catch (error) {
        res.status(500).json({ message: "Error al recuperar factura", error: error.message });
    }
};