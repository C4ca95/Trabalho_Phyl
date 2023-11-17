const Candidato = require('../model/Dev');

exports.loginCandidato = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const candidato = await Candidato.findOne({ email, senha });

        if (candidato) {
            // Autenticação bem-sucedida
            res.json({ mensagem: 'Login bem-sucedido', candidato });
        } else {
            res.status(401).json({ mensagem: 'Credenciais inválidas' });
        }
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro no servidor', error });
    }
};

exports.criarCandidato = async (req, res) => {
    try {
        const novoCandidato = new Candidato(req.body);
        await novoCandidato.save();
        res.json(novoCandidato);
    } catch (error) {
        res.status(400).json({ mensagem: error.message });
    }
};

exports.obterCandidatos = async (req, res) => {
    try {
        const candidatos = await Candidato.find();
        res.json(candidatos);
    } catch (error) {
        res.status(500).json({ mensagem: error.message });
    }
};

exports.obterCandidatoPorId = async (req, res) => {
    try {
        const candidato = await Candidato.findById(req.params.id);
        if (candidato) {
            res.json(candidato);
        } else {
            res.status(404).json({ mensagem: 'Candidato não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensagem: error.message });
    }
};

exports.atualizarCandidato = async (req, res) => {
    try {
        const candidato = await Candidato.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (candidato) {
            res.json(candidato);
        } else {
            res.status(404).json({ mensagem: 'Candidato não encontrado' });
        }
    } catch (error) {
        res.status(400).json({ mensagem: error.message });
    }
};

exports.excluirCandidato = async (req, res) => {
    try {
        const candidato = await Candidato.findByIdAndDelete(req.params.id);
        if (candidato) {
            res.json({ mensagem: 'Candidato excluído com sucesso' });
        } else {
            res.status(404).json({ mensagem: 'Candidato não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensagem: error.message });
    }
};