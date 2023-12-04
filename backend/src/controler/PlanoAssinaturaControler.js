const PlanoAssinatura = require('../model/PlanoAssinatura');
const Dev = require('../model/Dev');
const Emp = require('../model/Emp');

const planoController = {
  criarPlano: async (req, res) => {
    try {
      //const novoPlano = await PlanoAssinatura.create(req.body);
      const novoPlano = new PlanoAssinatura(req.body);
      await novoPlano.save();
      res.json(novoPlano);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar o plano de assinatura' });
    }
  },

  listarPlanos: async (req, res) => {
    try {
      const planos = await PlanoAssinatura.find();
      res.json(planos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar os planos de assinatura' });
    }
  },

  obterPlanoPorId: async (req, res) => {
    try {
      const plano = await PlanoAssinatura.findById(req.params.id);
      res.json(plano);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar o plano de assinatura' });
    }
  },

  atualizarPlano: async (req, res) => {
    try {
      const planoAtualizado = await PlanoAssinatura.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(planoAtualizado);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar o plano de assinatura' });
    }
  },

  excluirPlano: async (req, res) => {
    try {
      const planoExcluido = await PlanoAssinatura.findByIdAndRemove(req.params.id);
      res.json(planoExcluido);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao excluir o plano de assinatura' });
    }
  },

  aplicarPlano: async (req, res) => {
    try {
        const { userId, planoId } = req.body;
        const dev = await Dev.findById(userId);
        const emp = await Emp.findById(userId);
        const plano = await PlanoAssinatura.findById(planoId);

        if (plano) {
          if(dev){

            dev.planoAssinatura = plano._id;
            dev.likesDisponiveis = plano.likeBeneficio; // Adapte conforme a estrutura real do seu schema
            await dev.save();
            res.json({ mensagem: 'Plano aplicado com sucesso', user: dev });

          } else if (emp){

            emp.planoAssinatura = plano._id;
            emp.likesDisponiveis = plano.likeBeneficio; // Adapte conforme a estrutura real do seu schema
            await emp.save();
            res.json({ mensagem: 'Plano aplicado com sucesso', user: emp });

          } else{

            res.status(404).json({ mensagem: 'Usuário não encontrado' });

          }
           
        } else {
            res.status(404).json({ mensagem: 'Plano não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensagem: error.message });
    }
  },
  
};

module.exports = planoController;
