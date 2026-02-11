const express = require('express');
const router = express.Router();
const batchController = require('../controllers/batchController');

// 1. Importaciones corregidas
const { protect } = require('../middleware/authMiddleware'); // Solo traemos protect
const checkRole = require('../middleware/checkRoleMiddleware'); // Traemos el nuevo validador de roles

// 2. Rutas actualizadas con checkRole
// Nota: Asegúrate de que los nombres de los roles coincidan con tu base de datos (ej: 'Admin' o 'ADMIN_ROLE')

router.post('/', 
    protect, 
    checkRole('Admin', 'Bodeguero'), 
    batchController.createBatch
);

router.get('/', 
    protect, 
    batchController.getAllBatches
);

router.get('/:id', 
    protect, 
    batchController.getBatchById
);

router.put('/:id', 
    protect, 
    checkRole('Admin'), 
    batchController.updateBatch
);

router.delete('/:id', 
    protect, 
    checkRole('Admin'), 
    batchController.deleteBatch
);

module.exports = router;