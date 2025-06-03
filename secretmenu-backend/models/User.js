
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    usuario: String,
    email: String,
    telefono: String,
    password: String,
    foto: String // imagen en base64
});

module.exports = mongoose.model('User', userSchema);
