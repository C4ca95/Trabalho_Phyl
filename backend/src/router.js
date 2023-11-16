const express = require('express');
const router = express.Router();
const DevControler = require('./controler/DevControler')
//const multer = require('multer')
const EmpControler = require('./controler/EmpControler')

router.get('/', (req, res) => {

    return res.json({ message: `Muito Bem!Tudo funcionando!!!` });
});

//CRUD do candidato desenvolvedor
router.post('/devs', DevControler.store)
router.get('/devs', DevControler.index)
router.delete('/deleteDev', DevControler.deleteDev);
router.patch('/updateDev', DevControler.updateDev);

//CRUD do usuario empresa
router.post('/emps', EmpControler.store)
router.get('/emps', EmpControler.index)
router.delete('/deleteEmp', EmpControler.deleteEmp);
router.patch('/updateEmp', EmpControler.updateEmp);


module.exports = router;