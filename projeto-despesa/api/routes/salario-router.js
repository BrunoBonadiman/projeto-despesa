const express = require('express');
const router = express.Router();

const SalarioController = require('../controllers/salario-controller');

router.get('/listar', SalarioController.listar);
router.get('/:id', SalarioController.buscar);
router.get('/somar', SalarioController.somar);
router.post('/cadastrar', SalarioController.cadastrar);
router.put('/:id', SalarioController.atualizar);
router.delete('/:id', SalarioController.deletar);

module.exports = router;
