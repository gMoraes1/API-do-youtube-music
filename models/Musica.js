const mongoose = require('mongoose')

const Musica = mongoose.model('Musica', {
    nome_musica: String,
    genero_musica: String,
}) 

module.exports = Musica;
