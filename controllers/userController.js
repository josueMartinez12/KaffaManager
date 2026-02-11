const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. Registro de usuarios
exports.registerUser = async (req, res) => {
    try {
        const { nombreCompleto, email, password, rol } = req.body;
        
        // Verificar si el usuario ya existe
        const existe = await User.findOne({ email });
        if (existe) return res.status(400).json({ message: "El correo ya está registrado" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const nuevoUsuario = new User({
            nombreCompleto,
            email,
            password: hashedPassword,
            rol
        });

        await nuevoUsuario.save();
        res.status(201).json({ message: "Usuario creado con éxito" });
    } catch (error) {
        res.status(400).json({ message: "Error al crear usuario", error: error.message });
    }
};

// 2. Login de usuarios (Genera Token)
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await User.findOne({ email });

        if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

        const esValido = await bcrypt.compare(password, usuario.password);
        if (!esValido) return res.status(401).json({ message: "Contraseña incorrecta" });

        // Crear Token JWT
        const token = jwt.sign(
            { id: usuario._id, rol: usuario.rol },
            process.env.JWT_SECRET || 'secretKey', // Asegúrate de tener esto en tu .env
            { expiresIn: '8h' }
        );

        res.json({
            token,
            user: { id: usuario._id, nombre: usuario.nombreCompleto, rol: usuario.rol }
        });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" });
    }
};

// 3. Obtener todos los usuarios
exports.getUsers = async (req, res) => {
    try {
        const usuarios = await User.find().select('-password');
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener usuarios" });
    }
};

// 4. Actualizar usuario (PUT)
exports.updateUser = async (req, res) => {
    try {
        const { password, ...datosActualizar } = req.body;
        
        // Si el admin cambia la contraseña, hay que volver a encriptarla
        if (password) {
            const salt = await bcrypt.genSalt(10);
            datosActualizar.password = await bcrypt.hash(password, salt);
        }

        const actualizado = await User.findByIdAndUpdate(req.params.id, datosActualizar, { new: true }).select('-password');
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ message: "Error al actualizar" });
    }
};

// 5. Eliminar usuario (DELETE)
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "Usuario eliminado" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar" });
    }
};