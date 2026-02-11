const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

// Prefijo base: /api/suppliers (o como lo tengas en server.js)
router.post('/', supplierController.createSupplier);      // Crear finca
router.get('/', supplierController.getSuppliers);         // Ver lista completa
router.get('/:id', supplierController.getSupplierById);   // Ver detalle de una finca
router.put('/:id', supplierController.updateSupplier);    // Editar datos
router.delete('/:id', supplierController.deleteSupplier); // Borrar finca

module.exports = router;