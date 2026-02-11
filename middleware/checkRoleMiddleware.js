const checkRole = (...rolesPermitidos) => {
    return (req, res, next) => {
        // 1. Verificar que el middleware de auth ya se ejecutó y cargó al usuario
        if (!req.user) {
            return res.status(500).json({
                ok: false,
                msg: 'Se intenta verificar el rol sin validar el token primero'
            });
        }

        // 2. Extraer el rol y email del usuario (inyectados previamente por authMiddleware)
        const { rol, email } = req.user;

        // 3. Verificar si el rol del usuario está autorizado
        if (!rolesPermitidos.includes(rol)) {
            return res.status(403).json({
                ok: false,
                msg: `Acceso denegado. El usuario ${email} no tiene los permisos necesarios: [${rolesPermitidos}]`
            });
        }

        next();
    };
};

module.exports = checkRole;