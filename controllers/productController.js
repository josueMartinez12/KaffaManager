const Product = require('../models/Product');

// 1. Crear producto
exports.createProduct = async (req, res) => {
    try {
        const nuevoProducto = new Product(req.body);
        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);
    } catch (error) {
        // Aquí verás los errores de validación (como el de la categoría)
        res.status(400).json({ message: "Error al crear producto", error: error.message });
    }
};

// 2. Obtener todos los productos
exports.getProducts = async (req, res) => {
    try {
        const productos = await Product.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener productos" });
    }
};

// 3. Obtener un producto por ID
exports.getProductById = async (req, res) => {
    try {
        const producto = await Product.findById(req.params.id);
        if (!producto) return res.status(404).json({ message: "Producto no encontrado" });
        res.json(producto);
    } catch (error) {
        res.status(500).json({ message: "Error al buscar el producto", error: error.message });
    }
};

// 4. Actualizar producto (PUT)
exports.updateProduct = async (req, res) => {
    try {
        const productoActualizado = await Product.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true } // new: true devuelve el objeto ya cambiado
        );
        if (!productoActualizado) return res.status(404).json({ message: "No se encontró el producto para actualizar" });
        res.json(productoActualizado);
    } catch (error) {
        res.status(400).json({ message: "Error al actualizar", error: error.message });
    }
};

// 5. Eliminar producto (DELETE)
exports.deleteProduct = async (req, res) => {
    try {
        const productoEliminado = await Product.findByIdAndDelete(req.params.id);
        if (!productoEliminado) return res.status(404).json({ message: "Producto no encontrado" });
        res.json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar", error: error.message });
    }
};