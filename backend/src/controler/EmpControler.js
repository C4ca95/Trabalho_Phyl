const Empresa = require('../model/Emp');
const Match = require('../model/Match');


exports.criarEmpresa = async (req, res) => {
    try {
        const image = req.file ? req.file.filename : '';
        const novaEmpresa = new Empresa(req.body);
        novaEmpresa.image = image;
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
        const { id } = req.params;
        const dadosAtualizados = req.body;

        // Verifica se há uma nova imagem no corpo da requisição
        if (req.file) {
            dadosAtualizados.imagee = req.file.filename;
        }

        const emp = await Empresa.findByIdAndUpdate(
            id,
            dadosAtualizados,
            { new: true }
        );
        if (emp) {
            res.json(emp);
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

exports.obterCandidatosSemMatch = async (req, res) => {
    const { idEmpresa } = req.params.id;

    try {
        // Obter IDs dos candidatos que tiveram match com a empresa
        const matches = await Match.find({ empresa: idEmpresa });
        const idsCandidatosComMatch = matches.map(match => match.dev);

        // Obter todos os candidatos que não tiveram match com a empresa
        const candidatosSemMatch = await Candidato.find({ _id: { $nin: idsCandidatosComMatch } });

        res.json(candidatosSemMatch);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro no servidor', error });
    }
};