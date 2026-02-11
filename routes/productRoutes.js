const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Rutas para /api/productos
router.post('/', productController.createProduct);      // Crear
router.get('/', productController.getProducts);         // Listar todos
router.get('/:id', productController.getProductById);   // Ver detalle
router.put('/:id', productController.updateProduct);    // Actualizar
router.delete('/:id', productController.deleteProduct); // Eliminar

module.exports = router;