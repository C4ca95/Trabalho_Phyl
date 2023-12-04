const mongoose = require('mongoose');

const candidatoSchema = new mongoose.Schema({
    image: String,
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

    },
    cidade: String,
    estado: String,
    descricao: String,
    planoAssinatura: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlanoAssinatura',
    },
    likesDisponiveis: { type: Number, default: 10 },
    likes: [String],
    matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }],

});

const Candidato = mongoose.model('Candidato', candidatoSchema);

module.exports = Candidato;
