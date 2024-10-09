const mongoose = require('mongoose')

const Artista = mongoose.model('Artista', {
    nome_artista:  String,
    idade_artista: Number,
    genero_artista: String,
}) 

module.exports = Artista;
