const Vaga = require('../models/vagaModel');

// Controladores CRUD
const criarVaga = async (req, res) => {
  try {
    const novaVaga = new Vaga(req.body);
    await novaVaga.save();
    res.status(201).send(novaVaga);
  } catch (error) {
    res.status(400).send(error);
  }
};

const listarVagas = async (req, res) => {
  try {
    const vagas = await Vaga.find();
    res.send(vagas);
  } catch (error) {
    res.status(500).send(error);
  }
};

const atualizarVaga = async (req, res) => {
  try {
    const vaga = await Vaga.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(vaga);
  } catch (error) {
    res.status(400).send(error);
  }
};

const excluirVaga = async (req, res) => {
  try {
    const vaga = await Vaga.findByIdAndDelete(req.params.id);
    if (!vaga) {
      res.status(404).send('Vaga não encontrada');
    }
    res.send(vaga);
  } catch (error) {
    res.status(500).send(error);
  }
};


const obterVagaPorId = async (req, res) => {
    try {
      const vaga = await Vaga.findById(req.params.id);
      if (!vaga) {
        res.status(404).send('Vaga não encontrada');
      }
      res.send(vaga);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  module.exports = {
    criarVaga,
    listarVagas,
    obterVagaPorId,
    atualizarVaga,
    excluirVaga,
  };
