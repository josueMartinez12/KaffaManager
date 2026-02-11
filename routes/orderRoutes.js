const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Definición de rutas
router.post('/', orderController.createOrder);
router.get('/', orderController.getOrders);
router.get('/:id', orderController.getOrderById); // Añadida para completar el CRUD
router.put('/:id/status', orderController.updateOrderStatus);

module.exports = router;