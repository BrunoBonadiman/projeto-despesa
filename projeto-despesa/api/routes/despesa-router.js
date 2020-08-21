const express = require('express');
const router = express.Router();

const DespesaController = require('../controllers/despesa-controller');

router.get('/listar', DespesaController.listar);
router.get('/:id', DespesaController.buscar);
router.post('/cadastrar', DespesaController.cadastrar);
router.put('/:id', DespesaController.atualizar);
router.delete('/:id', DespesaController.deletar);

module.exports = router;
