const Batch = require('../models/Batch');

// 1. Crear un nuevo lote (POST)
exports.createBatch = async (req, res) => {
    try {
        const nuevoLote = new Batch(req.body);
        await nuevoLote.save();
        res.status(201).json(nuevoLote);
    } catch (error) {
        res.status(400).json({ message: "Error al registrar lote", error: error.message });
    }
};

// 2. Obtener todos los lotes (GET)
exports.getAllBatches = async (req, res) => {
    try {
        // Quitamos el populate y el sort de campos que no existen
        const lotes = await Batch.find(); 
        res.json(lotes);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener lotes", error: error.message });
    }
};

// 3. Obtener lote por ID (GET)
exports.getBatchById = async (req, res) => {
    try {
        const lote = await Batch.findById(req.params.id).populate('producto');
        if (!lote) return res.status(404).json({ message: "Lote no encontrado" });
        res.json(lote);
    } catch (error) {
        res.status(500).json({ message: "Error en la búsqueda del lote" });
    }
};

// 4. Actualizar lote (PUT)
exports.updateBatch = async (req, res) => {
    try {
        const actualizado = await Batch.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!actualizado) return res.status(404).json({ message: "Lote no encontrado" });
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ message: "Error al actualizar lote" });
    }
};

// 5. Eliminar lote (DELETE)
exports.deleteBatch = async (req, res) => {
    try {
        await Batch.findByIdAndDelete(req.params.id);
        res.json({ message: "Lote eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar lote" });
    }
};