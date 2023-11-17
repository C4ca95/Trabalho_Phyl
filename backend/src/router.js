const express = require('express');
const router = express.Router();
const DevControler = require('./controler/DevControler')
//const multer = require('multer')
const EmpControler = require('./controler/EmpControler')

router.get('/', (req, res) => {

    return res.json({ message: `Muito Bem!Tudo funcionando!!!` });
});

//CRUD do candidato desenvolvedor
router.post('/candidatos', DevControler.criarCandidato);
router.get('/candidatos', DevControler.obterCandidatos);
router.get('/candidatos/:id', DevControler.obterCandidatoPorId);
router.put('/candidatos/:id', DevControler.atualizarCandidato);
router.delete('/candidatos/:id', DevControler.excluirCandidato);

//CRUD do usuario empresa
router.post('/empresas', EmpControler.criarEmpresa);
router.get('/empresas', EmpControler.obterEmpresas);
router.get('/empresas/:id', EmpControler.obterEmpresaPorId);
router.put('/empresas/:id', EmpControler.atualizarEmpresa);
router.delete('/empresas/:id', EmpControler.excluirEmpresa);


module.exports = router;