const User = require('../models/User');

const createAdmin = async () => {
    try {
        // 1. Verificar si ya existen usuarios
        const count = await User.estimatedDocumentCount();
        if (count > 0) return;

        // 2. Crear el usuario administrador
        // NO encriptamos aquí, dejamos que el modelo (pre-save) lo haga solo
        const adminUser = new User({
            nombreCompleto: 'Administrador del Sistema',
            email: 'admin@kaffamanager.com',
            password: 'admin123', 
            rol: 'Admin', // Usamos 'Admin' que está en tu enum del modelo
            status: 'active'
        });

        // 3. Guardar en la base de datos
        await adminUser.save();
        
        console.log('----------------------------------------------------');
        console.log('✅ Usuario administrador creado por defecto:');
        console.log('📧 Email: admin@kaffamanager.com');
        console.log('🔑 Password: admin123');
        console.log('🛡️ Rol: Admin');
        console.log('----------------------------------------------------');

    } catch (error) {
        console.error('❌ Error creando usuario por defecto:', error);
    }
};

module.exports = { createAdmin };