const Candidato = require('../model/Dev');
const Empresa = require('../model/Emp');
const Match = require('../model/Match');

exports.loginCandidato = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const candidato = await Candidato.findOne({ email, senha });
        const empresa = await Empresa.findOne({ email, senha });

        if (candidato || empresa) {
            if(candidato) res.json({ mensagem: 'Login bem-sucedido', user: candidato, role: 'candidato' });
            else res.json({ mensagem: 'Login bem-sucedido', user: empresa, role: 'empresa' });
        } else {
            res.status(401).json({ mensagem: 'Credenciais inválidas' });
        }
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro no servidor', error });
    }
};

exports.criarCandidato = async (req, res) => {
    try {
        const image = req.file ? req.file.filename : '';
        const novoCandidato = new Candidato(req.body);
        novoCandidato.image = image;
        await novoCandidato.save();
        res.json({mensagem: 'Candidato criado com sucesso!' });
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
        const { id } = req.params;
        const dadosAtualizados = req.body;

        // Verifica se há uma nova imagem no corpo da requisição
        if (req.file) {
            dadosAtualizados.image = req.file.filename;
        }

        const candidato = await Candidato.findByIdAndUpdate(
            id,
            dadosAtualizados,
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



exports.obterEmpresasSemMatch = async (req, res) => {
    const { idCandidato } = req.params.id;

    try {
        // Obter IDs das empresas que tiveram match com o candidato
        const matches = await Match.find({ dev: idCandidato });
        const idsEmpresasComMatch = matches.map(match => match.empresa);

        // Obter todas as empresas que não tiveram match com o candidato
        const empresasSemMatch = await Empresa.find({ _id: { $nin: idsEmpresasComMatch } });

        res.json(empresasSemMatch);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro no servidor', error });
    }
};