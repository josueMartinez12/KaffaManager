const express = require('express');
const authRoutes = require('./authRoutes')
const router = express.Router();

// Rutas existentes
router.use('/products', require('./productRoutes'));
router.use('/orders', require('./orderRoutes'));
router.use('/inventory', require('./inventoryRoutes'));
router.use('/users', require('./userRoutes'));
router.use('/batches', require('./batchRoutes'));
router.use('/suppliers', require('./supplierRoutes'));
router.use('/sales', require('./salesRoutes'));
router.use('/auth', authRoutes);
router.use('/invoices', require('./invoiceRoutes')); 

module.exports = router;