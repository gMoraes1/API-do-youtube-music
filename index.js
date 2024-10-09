const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Importando bcrypt
const Usuario = require('./models/Usuario');
const Musica = require('./models/Musica');
const Artista = require('./models/Artista');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send({ message: 'Bem-vindo ao meu servidor' });
});

// Endpoint para criar usuários
app.post('/usuarios', async (req, res) => {
    const { name_usuario, senha, email } = req.body;

    // Criptografando a senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    const usuario = { name_usuario, senha: hashedPassword, email };
    try {
        await Usuario.create(usuario);
        res.status(201).send({ message: 'Usuário criado com sucesso' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(400).send({ message: 'Erro ao buscar usuários' });
    }
});

app.get('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findById(id);
        res.status(200).json(usuario);
    } catch (error) {
        res.status(400).send({ message: 'Erro ao buscar usuário' });
    }
});


app.put('/usuarios/:id', async (req, res) => {
    const { name_usuario, senha, email } = req.body;
    const { id } = req.params;
    try {
        await Usuario.findByIdAndUpdate(id, { name_usuario, senha, email });
        res.status(200).send({ message: 'Usuário atualizado com sucesso' });
    } catch (error) {
        res.status(400).send({ message: 'Erro ao atualizar usuário' });
    }
});

app.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Usuario.findByIdAndDelete(id);
        res.status(200).send({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        res.status(400).send({ message: 'Erro ao deletar usuário' });
    }
});


app.post('/musicas', async (req, res) => {
    const { nome_musica, genero_musica } = req.body;
    const musica = { nome_musica, genero_musica };
    try {
        await Musica.create(musica);
        res.status(201).send({ message: 'Música criada com sucesso' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.get('/musicas', async (req, res) => {
    try {
        const musicas = await Musica.find();
        res.status(200).json(musicas);
    } catch (error) {
        res.status(400).send({ message: 'Erro ao buscar músicas' });
    }
});

app.get('/musicas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const musica = await Musica.findById(id);
        res.status(200).json(musica);
    } catch (error) {
        res.status(400).send({ message: 'Erro ao buscar música' });
    }
});

app.put('/musicas/:id', async (req, res) => {
    const { nome_musica, genero_musica } = req.body;
    const { id } = req.params;
    try {
        await Usuario.findByIdAndUpdate(id, { nome_musica, genero_musica });
        res.status(200).send({ message: 'Usuário atualizado com sucesso' });
    } catch (error) {
        res.status(400).send({ message: 'Erro ao atualizar usuário' });
    }
});

app.delete('/musicas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Musica.findByIdAndDelete(id);
        res.status(200).send({ message: 'Música deletada com sucesso' });
    } catch (error) {
        res.status(400).send({ message: 'Erro ao deletar música' });
    }
});


app.post('/artistas', async (req, res) => {
    const { nome_artista, idade_artista, genero_artista } = req.body;
    const artista = { nome_artista, idade_artista, genero_artista };
    try {
        await Artista.create(artista);
        res.status(201).send({ message: 'Artista criado com sucesso' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.get('/artistas', async (req, res) => {
    try {
        const artistas = await Artista.find();
        res.status(200).json(artistas);
    } catch (error) {
        res.status(400).send({ message: 'Erro ao buscar artistas' });
    }
});

app.get('/artistas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const artista = await Artista.findById(id);
        res.status(200).json(artista);
    } catch (error) {
        res.status(400).send({ message: 'Erro ao buscar artista' });
    }
});

app.put('/artistas/:id', async (req, res) => {
    const { nome_artista, idade_artista, genero_artista } = req.body;
    const { id } = req.params;
    try {
        await Artista.findByIdAndUpdate(id, { nome_artista, idade_artista, genero_artista });
        res.status(200).send({ message: 'Artista atualizado com sucesso' });
    } catch (error) {
        res.status(400).send({ message: 'Erro ao atualizar artista' });
    }
});

app.delete('/artistas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Artista.findByIdAndDelete(id);
        res.status(200).send({ message: 'Artista deletado com sucesso' });
    } catch (error) {
        res.status(400).send({ message: 'Erro ao deletar artista' });
    }
});


mongoose.connect('mongodb://localhost:27017/nome_do_seu_banco').then(() => {
    console.log('Conectado ao banco de dados');
    app.listen(3000, () => {
        console.log('Servidor rodando na porta 3000');
    });
}).catch((err) => {
    console.log('Erro ao conectar ao banco de dados: ' + err);
});
