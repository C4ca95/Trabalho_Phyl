const express = require('express');
const router = express.Router();
const DevControler = require('./controler/DevControler')
const configMulter = require('./model/multer');
const multer = require('multer');
const EmpControler = require('./controler/EmpControler')
const vagaController = require('./controler/VagaControler');
const planoController = require('./controler/PlanoAssinaturaControler');
const likeControler = require('./controler/LikeControler');
const likeControlerDev = require('./controler/LikeControlerDev');

router.get('/', (req, res) => {

    return res.json({ message: `Muito Bem!Tudo funcionando!!!` });
});

//CRUD do candidato desenvolvedor
router.post('/candidatos', multer(configMulter).single('image'), DevControler.criarCandidato);
router.get('/candidatos', DevControler.obterCandidatos);
router.get('/candidatos/:id', DevControler.obterCandidatoPorId);
router.put('/candidatos/:id', multer(configMulter).single('image'), DevControler.atualizarCandidato);
router.delete('/candidatos/:id', DevControler.excluirCandidato);
router.post('/login/candidato', DevControler.loginCandidato);
router.get('/obterEmpresaSemMatch/:id', DevControler.obterEmpresasSemMatch);

//CRUD do usuario empresa
router.post('/empresas', multer(configMulter).single('image'), EmpControler.criarEmpresa);
router.get('/empresas', EmpControler.obterEmpresas);
router.get('/empresas/:id', EmpControler.obterEmpresaPorId);
router.put('/empresas/:id', multer(configMulter).single('image'), EmpControler.atualizarEmpresa);
router.delete('/empresas/:id', EmpControler.excluirEmpresa);
router.get('/obterCandidatosSemMatch/:id', EmpControler.obterCandidatosSemMatch);

//router.post('/login/empresa', EmpControler.loginEmpresa);

// CRUD vagas
router.post('/vagas', vagaController.criarVaga);
router.get('/vagas', vagaController.listarVagas);
router.get('/vagas/:id', vagaController.obterVagaPorId);
router.patch('/vagas/:id', vagaController.atualizarVaga);
router.delete('/vagas/:id', vagaController.excluirVaga);
router.get('/vagas/empresa/:idEmpresa', vagaController.listarVagasPorEmpresaId);

// Rota para criar um novo plano de assinatura
router.post('/planos', planoController.criarPlano);

// Rota para obter todos os planos de assinatura
router.get('/planos', planoController.listarPlanos);

// Rota para obter um plano de assinatura específico por ID
router.get('/planos/:id', planoController.obterPlanoPorId);

// Rota para atualizar um plano de assinatura específico por ID
router.put('/planos/:id', planoController.atualizarPlano);

// Rota para excluir um plano de assinatura específico por ID
router.delete('/planos/:id', planoController.excluirPlano);

router.post('/aplicarPlano', planoController.aplicarPlano);

// Like empresa em candidato
router.post('/darLikeEmp', likeControler.darLikeEmp);
router.delete('/removeLikeEmp/:id', likeControler.desfazerMatch);
//Like candidato na empresa
router.post('/darLikeDev', likeControlerDev.darLikeDev);
router.delete('/removeLikeDev/:id', likeControlerDev.desfazerMatch);


module.exports = router;