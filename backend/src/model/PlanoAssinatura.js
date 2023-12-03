const mongoose = require('mongoose');

const planoAssinaturaSchema = new mongoose.Schema({
  nomeDoPlano: String,
  descricao: String,
  preco: Number,
  likeBeneficio: Number,
  duracao: String,
  status: Boolean,
  dataInicioVigencia: Date,
  dataTerminoVigencia: Date,
  opcoesPagamento: [String],
});

const PlanoAssinatura = mongoose.model('PlanoAssinatura', planoAssinaturaSchema);

module.exports = PlanoAssinatura;