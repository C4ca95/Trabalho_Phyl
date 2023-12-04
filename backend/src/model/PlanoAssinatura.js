const mongoose = require('mongoose');

const planoAssinaturaSchema = new mongoose.Schema({
  nomeDoPlano: String,
  descricao: String,
  preco: Number,
  likeBeneficio: Number,
  duracao: String,
  status: Boolean,
  opcoesPagamento: {
    type: [String],
    default: ['Cartao', 'PIX'], // Valor padrão
    enum: ['PIX', 'Cartao'],
},
});

const PlanoAssinatura = mongoose.model('PlanoAssinatura', planoAssinaturaSchema);

module.exports = PlanoAssinatura;