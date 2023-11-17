const mongoose = require('mongoose');

const candidatoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // Adicionando uma validação simples de formato de email
        validate: {
            validator: (value) => /\S+@\S+\.\S+/.test(value),
            message: 'Formato de e-mail inválido',
        },
    },
    senha: {
        type: String,
        required: true,
    },
    confirmarSenha: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return this.senha === value;
            },
            message: 'As senhas não coincidem',
        },
    },
    telefone: String,
    cpf: {
        type: String,
        required: true,
        unique: true,
        // Adicionando uma validação simples de formato de CPF
        validate: {
            validator: (value) => /\d{3}\.\d{3}\.\d{3}-\d{2}/.test(value),
            message: 'Formato de CPF inválido',
        },
    },
    cidade: String,
    estado: String,
    imagem: String,
    descricao: String,
});

const Candidato = mongoose.model('Candidato', candidatoSchema);

module.exports = Candidato;
