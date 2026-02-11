const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); 
const checkRole = require('../middleware/checkRoleMiddleware'); 

// 2. Rutas actualizadas con el nombre de rol correcto
router.get('/', [protect, checkRole('Admin')], (req, res) => {
    res.json({ msg: "Inventario cargado correctamente" });
});

// Ejemplo para registrar un movimiento de inventario
router.post('/move', [protect, checkRole('Admin')], async (req, res) => {
    // Aquí iría tu lógica de guardar en el modelo Inventory
    res.json({ msg: "Movimiento registrado" });
});

module.exports = router;