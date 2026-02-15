const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware de seguridad (los que ya tenías)
const { protect } = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');

/**
 * @desc Generar un Token JWT
 * @param {string} id - ID del usuario
 */
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret_kaffa_2024', {
        expiresIn: '30d',
    });
};

// --- RUTA DE LOGIN ---
// Esta ruta es la que usará el usuario creado por initialSetup
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Buscar al usuario (el que creó initialSetup)
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Usuario no encontrado" });
        }

        // 2. Usar el método matchPassword de tu Schema de Mongoose
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        // 3. Responder con el token y datos del usuario
        res.json({
            _id: user._id,
            nombreCompleto: user.nombreCompleto,
            email: user.email,
            rol: user.rol,
            token: generateToken(user._id)
        });

    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});

// --- RUTA DE REGISTRO ---
router.post('/register', async (req, res) => {
    try {
        const { nombreCompleto, email, password, rol } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Ese correo ya está registrado" });
        }

        const user = await User.create({
            nombreCompleto,
            email,
            password,
            rol
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                nombreCompleto: user.nombreCompleto,
                email: user.email,
                rol: user.rol,
                token: generateToken(user._id)
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al crear usuario" });
    }
});

// --- RUTAS PROTEGIDAS ---
// Nota: Cambié ADMIN_ROLE por 'Admin' para que coincida con tu initialSetup
router.get('/', [protect, checkRole('Admin')], async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener usuarios" });
    }
});

module.exports = router;