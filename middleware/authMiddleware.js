const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    // 1. Verificar si viene el token en los headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 2. Extraer el token
            token = req.headers.authorization.split(' ')[1];

            // 3. Verificar el token con la clave secreta
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 4. Buscar el usuario y agregarlo al objeto req (sin el password)
            req.user = await User.findById(decoded.id).select('-password');

            return next(); // Continuar si todo está bien
        } catch (error) {
            return res.status(401).json({ message: 'No autorizado, token fallido' });
        }
    }

    // 5. Si no hay token
    if (!token) {
        return res.status(401).json({ message: 'No autorizado, no hay token' });
    }
};

// Exportamos como un objeto para que puedas usar { protect } en tus rutas
module.exports = { protect };