const mongoose = require('mongoose')

const Usuario = mongoose.model('Usuario', {
    name_usuario:  String,
    senha: String,
    email: String,
}) 

module.exports = Usuario;
