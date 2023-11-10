const Emp = require('../model/Emp')


module.exports = {

    async index(req, res) {
        const { user } = req.headers
        const users = await Vaga.find({ idEmp: user })
        let resul = await List.listItems(users.reverse(), req.query.pg, req.query.vs)
        return res.json(resul)
    },


    async store(req, res) {

        const {type } = req.body;

        if(type == true){
            const {username,senha} = req.body
            const userExist = await Emp.findOne({ user: username});

            if (userExist) {
                if(userExist.senha == senha){
                    const avat = userExist.avatar
                    userExist.avatar = avat
                    return res.json(userExist)
                }else{
                    return res.json({ message: "Senha errada"})
                }
            }
        }else{
            const { user,cidade, email, avatar,senha} = req.body
            const avat = 'https://getjobserver.herokuapp.com/image/' + avatar
            const emp = await Emp.create({
                user,
                avatar: avat,
                cidade,
                email,
                senha
            })

            return res.json(emp)
        }
    },

    async deleteEmp(req, res) {
        const { user } = req.headers;

        try {
            
            const deletedEmp = await Emp.findOneAndDelete({ _id: user });

            if (deletedEmp) {
                return res.json({ message: "Empresa excluída com sucesso", deletedEmp });
            } else {
                return res.status(404).json({ error: "Empresa não encontrada" });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao excluir a empresa" });
        }
    },

    async updateEmp(req, res) {
        const { user } = req.headers;

        try {
            
            const updatedEmp = await Emp.findOneAndUpdate(
                { _id: user },
                { $set: req.body },
                { new: true } 
            );

            if (updatedEmp) {
                return res.json({ message: "Empresa atualizada com sucesso", updatedEmp });
            } else {
                return res.status(404).json({ error: "Empresa não encontrada" });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao atualizar a empresa" });
        }
    },

    async emp(req,res){

        const {user} = req.headers
        const emp = await Emp.findById(user)
        return res.json(emp)
    }

}
