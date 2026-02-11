const Supplier = require('../models/Supplier');

// 1. Crear proveedor/finca (POST)
exports.createSupplier = async (req, res) => {
    try {
        const nuevoProveedor = new Supplier(req.body);
        await nuevoProveedor.save();
        res.status(201).json(nuevoProveedor);
    } catch (error) {
        res.status(400).json({ message: "Error al guardar proveedor", error: error.message });
    }
};

// 2. Obtener todos los proveedores (GET - Para la tabla de la Página 5)
exports.getSuppliers = async (req, res) => {
    try {
        const proveedores = await Supplier.find().sort({ nombre: 1 }); // Ordenados alfabéticamente
        res.json(proveedores);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener proveedores" });
    }
};

// 3. Obtener un proveedor por ID (GET)
exports.getSupplierById = async (req, res) => {
    try {
        const proveedor = await Supplier.findById(req.params.id);
        if (!proveedor) return res.status(404).json({ message: "Proveedor no encontrado" });
        res.json(proveedor);
    } catch (error) {
        res.status(500).json({ message: "ID no válido" });
    }
};

// 4. Actualizar proveedor (PUT)
exports.updateSupplier = async (req, res) => {
    try {
        const actualizado = await Supplier.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!actualizado) return res.status(404).json({ message: "No se encontró el proveedor" });
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ message: "Error al actualizar proveedor", error: error.message });
    }
};

// 5. Eliminar proveedor (DELETE)
exports.deleteSupplier = async (req, res) => {
    try {
        const eliminado = await Supplier.findByIdAndDelete(req.params.id);
        if (!eliminado) return res.status(404).json({ message: "Proveedor no encontrado" });
        res.json({ message: "Proveedor eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar" });
    }
};