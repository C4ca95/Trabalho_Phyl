const mongoose = require('mongoose');

const empresaSchema = new mongoose.Schema({
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
    cnpj: {
        type: String,
        required: true,
        unique: true,

    },
    cidade: String,
    estado: String,
    descricao: String,
    vagas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vagas',
    }],
    planoAssinatura: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlanoAssinatura',
    },
    likesDisponiveis: { type: Number, default: 10 },
    matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }],

});

const Empresa = mongoose.model('Empresa', empresaSchema);

module.exports = Empresa;
