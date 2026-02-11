const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

// 1. Importaciones actualizadas
const { protect } = require('../middleware/authMiddleware'); 
const checkRole = require('../middleware/checkRoleMiddleware'); 

// 2. Rutas protegidas con checkRole
// Nota: He usado 'ADMIN_ROLE' asumiendo que es el nombre que definimos en initialSetup
router.post('/checkout', protect, salesController.processSale);

// En salesRoutes.js

router.get('/', 
    protect, 
    checkRole('Admin'), // 👈 Cambia 'ADMIN_ROLE' por 'Admin'
    salesController.getSales
);

router.put('/:id/cancel', 
    protect, 
    checkRole('Admin'), // 👈 Cambia 'ADMIN_ROLE' por 'Admin'
    salesController.cancelSale
);

router.delete('/:id', 
    protect, 
    checkRole('Admin'), // 👈 Cambia 'ADMIN_ROLE' por 'Admin'
    salesController.deleteSale
);

module.exports = router;