const Dev = require('../model/Dev');
const Empresa = require('../model/Emp');
const Match = require('../model/Match');

exports.darLikeDev = async (req, res) => {
    const { userId, perfilAlvoId } = req.body;

    try {
        const usuario = await Empresa.findById(userId);
        const perfilAlvo = await Dev.findById(perfilAlvoId);

        if (!usuario || !perfilAlvo) {
            return res.status(404).json({ mensagem: 'Usuário ou perfil alvo não encontrado' });
        }

        if (usuario.likes.includes(perfilAlvoId)) {

            if (usuario.likesDisponiveis <= 0) {
                return res.json({mensagem: 'Sua cota de match se esgotou por hoje'})
            }
            // Usuário empresa curtiu o candidato ou vice-versa
            const match = new Match({ dev: userId, empresa: perfilAlvoId });
            await match.save();

            // Atualiza o número de likes disponíveis
            usuario.likesDisponiveis -= 1;
            usuario.matches.push(match._id); // Adiciona o match aos matches do usuário
            await usuario.save();

            perfilAlvo.matches.push(match._id); // Adiciona o match aos matches do perfil alvo (empresa)
            await perfilAlvo.save();

            return res.json({ mensagem: 'Match realizado com sucesso!', match });
        }

        // Adiciona o like do usuário empresa à lista de likes do candidato
        usuario.likes.push(perfilAlvoId);
        await usuario.save();

        return res.json({ mensagem: 'Like registrado com sucesso!' });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro no servidor', error });
    }

};

exports.desfazerMatch = async (req, res) => {
    const matchId = req.params.matchId;

    try {
        const match = await Match.findById(matchId);

        if (!match) {
            return res.status(404).json({ mensagem: 'Match não encontrado' });
        }

        const usuario = await Empresa.findById(match.dev);
        const perfilAlvo = await Dev.findById(match.empresa);

        if (!usuario || !perfilAlvo) {
            return res.status(404).json({ mensagem: 'Usuário ou perfil alvo não encontrado' });
        }

        // Remova o match dos arrays de matches do usuário e do perfil alvo
        usuario.matches.pull(matchId);
        await usuario.save();

        perfilAlvo.matches.pull(matchId);
        await perfilAlvo.save();

        // Remova o documento de match do banco de dados
        await Match.findByIdAndRemove(matchId);

        return res.json({ mensagem: 'Match desfeito com sucesso' });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro no servidor', error });
    }
};