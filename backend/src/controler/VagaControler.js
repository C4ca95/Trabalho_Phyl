const Vaga = require('../model/Vaga');
const Empresa = require('../model/Emp');

// Controladores CRUD
const criarVaga = async (req, res) => {
  try {
    const { idEmpresa } = req.body;
    const novaVaga = new Vaga(req.body);
    await novaVaga.save();
    const emp = await Empresa.findById(idEmpresa);
    if (emp){
      emp.vagas.push(novaVaga);
    }
    res.status(201).send({novaVaga, message: 'Vaga criada com sucesso!'});
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
        return res.status(404).send('Vaga não encontrada');
      }
      res.send(vaga);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  const listarVagasPorEmpresaId = async (req, res) => {
    try {
      // Obtenha o ID da empresa a partir dos parâmetros da solicitação
      const idEmpresa = req.params.idEmpresa;
  
      // Verifique se a empresa existe
      const empresa = await Empresa.findById(idEmpresa);
      if (!empresa) {
        return res.status(404).send('Empresa não encontrada');
      }
  
      // Encontre todas as vagas associadas ao ID da empresa
      const vagas = await Vaga.find({ idEmpresa: idEmpresa });
  
      // Verifique se há vagas associadas à empresa
      if (vagas.length === 0) {
        return res.status(404).send('Nenhuma vaga encontrada para esta empresa');
      }
  
      res.send(vagas);
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
    listarVagasPorEmpresaId,
  };
