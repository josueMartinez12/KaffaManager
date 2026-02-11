const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Función para generar el token (Helper)
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        
        // DEBUG: Verifica si el usuario existe
        console.log('¿Usuario encontrado?:', user ? 'SÍ' : 'NO');
        
        if (user) {
            const isMatch = await user.matchPassword(password);
            // DEBUG: Verifica si la contraseña coincide
            console.log('¿Contraseña coincide?:', isMatch);
            
            if (isMatch) {
                return res.json({
                    _id: user._id,
                    nombre: user.nombreCompleto,
                    token: generateToken(user._id)
                });
            }
        }
        
        res.status(401).json({ message: 'Email o contraseña incorrectos' });
    } catch (error) {
        console.error('Error en Login:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// @desc    Registrar nuevo usuario
exports.registerUser = async (req, res) => {
    const { nombreCompleto, email, password, rol } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'Usuario ya existe' });

        const user = await User.create({ nombreCompleto, email, password, rol });

        res.status(201).json({
            _id: user._id,
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};