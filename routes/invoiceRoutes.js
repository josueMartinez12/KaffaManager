const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

// 1. Importaciones actualizadas (Separamos protect de checkRole)
const { protect } = require('../middleware/authMiddleware'); 
const checkRole = require('../middleware/checkRoleMiddleware'); 

// 2. Rutas con la nueva validación
// Nota: Usa 'ADMIN_ROLE' y 'VENDEDOR_ROLE' (o como los tengas en tu DB)
router.post('/', 
    protect, 
    checkRole('ADMIN_ROLE', 'VENDEDOR_ROLE'), 
    invoiceController.createInvoice
);

router.get('/', 
    protect, 
    checkRole('ADMIN_ROLE', 'VENDEDOR_ROLE'), 
    invoiceController.getInvoices
);

router.get('/:id', 
    protect, 
    invoiceController.getInvoiceById
);

module.exports = router;