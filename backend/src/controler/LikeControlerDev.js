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
            // Usuário empresa curtiu o candidato ou vice-versa
            const match = new Match({ dev: userId, empresa: perfilAlvoId });
            await match.save();

            // Atualiza o número de likes disponíveis
            usuario.likesDisponiveis -= 1;
            await usuario.save();

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