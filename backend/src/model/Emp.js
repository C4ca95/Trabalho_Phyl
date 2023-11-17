const mongoose = require('mongoose');

const empresaSchema = new mongoose.Schema({
    nome: String,
    email: { type: String, unique: true },
    telefone: String,
    cnpj: { type: String, unique: true },
    cidade: String,
    estado: String,
});

const Empresa = mongoose.model('Empresa', empresaSchema);

module.exports = Empresa;
