const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    nombreCompleto: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: { 
        type: String, 
        required: true, 
        // Actualizamos el enum para que coincida con tus rutas y el script
        enum: ['Admin', 'Tostador', 'Cliente', 'Bodeguero', 'Vendedor', 'ADMIN_ROLE'], 
        default: 'Cliente'
    }
}, { timestamps: true });

// ENCRIPTAR CONTRASEÑA ANTES DE GUARDAR
userSchema.pre('save', async function() {
    // Si la contraseña no ha sido cambiada, no hacemos nada
    if (!this.isModified('password')) return; 
    
    try {
        console.log('Encriptando contraseña para:', this.email);
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        // No llamamos a next() aquí
    } catch (error) {
        throw error; // Simplemente lanzamos el error si algo sale mal
    }
});

// MÉTODO PARA COMPARAR CONTRASEÑAS
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);