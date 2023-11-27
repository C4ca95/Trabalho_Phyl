const mongoose = require('mongoose');

const vagaSchema = new mongoose.Schema({
  titulo: String,
  descricao: String,
  localizacao: String,
  modalidade: String,
  salario: String,
  setor: String,
  nivelExperiencia: String,
  tipoContrato: String,
  idEmpresa: String
});

const Vaga = mongoose.model('Vaga', vagaSchema);

module.exports = Vaga;