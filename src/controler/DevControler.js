const axios = require('axios')
const Dev = require('../model/Dev')

module.exports = {

    async index(req, res) {
        const { user } = req.headers

        const loggedUser = await Vaga.findById(user)
        const devs = await Dev.find({
            $and: [
                {likes: user},
                { _id: { $nin: loggedUser.likes } },
                { _id: { $nin: loggedUser.deslikes } },
            ],
        })

        let resul = await List.listItems(devs, req.query.pg, req.query.vs)
        return res.json(resul)
    },

    async store(req, res) {

        const { user,senha } = req.body;

        const userExist = await Dev.findOne({ user});
        if (userExist) {
            if(userExist.senha == senha){
                console.log(user , "entrou")
                return res.json(userExist)
            }else{
                return res.json({ message: "senhaErrada"})
            }
        }

        const response = await axios.get(`https://api.github.com/users/${user}`)

        const { name, bio, avatar_url: avatar,location: cidade,public_repos: repositorios, email } = response.data
        
        const dev = await Dev.create({
            name,
            user,
            bio,
            avatar,
            cidade,
            repositorios,
            email,
            senha,
        })
        console.log(user , " criado")

        return res.json(dev)
    },

    async deleteDev(req, res) {
        const { user } = req.headers;

        try {
            // Encontrar e excluir o desenvolvedor com base no ID do usuário
            const deletedDev = await Dev.findOneAndDelete({ _id: user });

            if (deletedDev) {
                return res.json({ message: "Desenvolvedor excluído com sucesso", deletedDev });
            } else {
                return res.status(404).json({ error: "Desenvolvedor não encontrado" });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao excluir o desenvolvedor" });
        }
    },

    async updateDev(req, res) {
        const { user } = req.headers;

        try {
            // Encontrar e atualizar o desenvolvedor com base no ID do usuário
            const updatedDev = await Dev.findOneAndUpdate(
                { _id: user },
                { $set: req.body },
                { new: true } // Retorna o documento atualizado
            );

            if (updatedDev) {
                return res.json({ message: "Desenvolvedor atualizado com sucesso", updatedDev });
            } else {
                return res.status(404).json({ error: "Desenvolvedor não encontrado" });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao atualizar o desenvolvedor" });
        }
    },


    async dev(req,res){

        const {user} = req.headers
        const dev = await Dev.findById(user)
        if(dev){
            return res.json(dev)
        }else{
            return res.json({erro: "Sem user"})
        }
        
    }

}