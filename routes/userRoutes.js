const express = require('express');
const router = express.Router();

// IMPORTANTE: Usa llaves {} porque exportamos un objeto
const { protect } = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');

// La ruta queda limpia y segura

router.get('/', [protect, checkRole('ADMIN_ROLE')], (req, res) => {
    res.json({ message: "Lista de usuarios obtenida" });
});

module.exports = router;