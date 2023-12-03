const Empresa = require('../model/Emp');


exports.criarEmpresa = async (req, res) => {
    try {
        const novaEmpresa = new Empresa(req.body);
        await novaEmpresa.save();
        res.json(novaEmpresa);
    } catch (error) {a
        res.status(400).json({ mensagem: error.message });
    }
};

exports.obterEmpresas = async (req, res) => {
    try {
        const empresas = await Empresa.find();
        res.json(empresas);
    } catch (error) {
        res.status(500).json({ mensagem: error.message });
    }
};

exports.obterEmpresaPorId = async (req, res) => {
    try {
        const empresa = await Empresa.findById(req.params.id);
        if (empresa) {
            res.json(empresa);
        } else {
            res.status(404).json({ mensagem: 'Empresa não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ mensagem: error.message });
    }
};

exports.atualizarEmpresa = async (req, res) => {
    try {
        const empresa = await Empresa.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (empresa) {
            res.json(empresa);
        } else {
            res.status(404).json({ mensagem: 'Empresa não encontrada' });
        }
    } catch (error) {
        res.status(400).json({ mensagem: error.message });
    }
};

exports.excluirEmpresa = async (req, res) => {
    try {
        const empresa = await Empresa.findByIdAndDelete(req.params.id);
        if (empresa) {
            res.json({ mensagem: 'Empresa excluída com sucesso' });
        } else {
            res.status(404).json({ mensagem: 'Empresa não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ mensagem: error.message });
    }
};