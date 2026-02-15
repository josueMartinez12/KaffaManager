const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const { protect } = require('../middleware/authMiddleware'); 
const checkRole = require('../middleware/checkRoleMiddleware'); 

// 1. Obtener stock actual (GET /api/inventory)
router.get('/', protect, checkRole('Admin', 'ADMIN_ROLE'), inventoryController.getCurrentStock);

// 2. Ajustar stock (POST /api/inventory/move o /api/inventory/adjust)
router.post('/adjust', protect, checkRole('Admin', 'ADMIN_ROLE'), inventoryController.adjustStock);

// 3. Alertas (GET /api/inventory/alerts)
router.get('/alerts', protect, checkRole('Admin', 'ADMIN_ROLE'), inventoryController.getLowStockAlerts);

module.exports = router;