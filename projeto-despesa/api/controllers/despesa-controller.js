var ObjectId = require('mongoose').Types.ObjectId;

var { Despesa } = require('../models/despesa-model');

module.exports.listar = (req, res, next) => {
    Despesa.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Erro ao recuperar lista de despesas :' + JSON.stringify(err, undefined, 2)); }
    });
};

module.exports.buscar = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`Nenhum registro com o ID fornecido : ${req.params.id}`);

    Despesa.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Erro ao recuperar a Despesa :' + JSON.stringify(err, undefined, 2)); }
    });
};

module.exports.cadastrar = (req, res, next) => {
    var despesa = new Despesa({
        descricao: req.body.descricao,
        valor: req.body.valor,
        vencimento: req.body.vencimento,
        observacao: req.body.observacao,
        mes: req.body.mes,
        ano: req.body.ano,
        status: req.body.status
    });
    despesa.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Erro ao cadastrar despesa :' + JSON.stringify(err, undefined, 2)); }
    });
};

module.exports.atualizar = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`Nenhum registro com o ID fornecido : ${req.params.id}`);

    var despesa = {
        descricao: req.body.descricao,
        valor: req.body.valor,
        vencimento: req.body.vencimento,
        observacao: req.body.observacao,
        mes: req.body.mes,
        ano: req.body.ano,
        status: req.body.status
    };
    Despesa.findByIdAndUpdate(req.params.id, { $set: despesa }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Erro ao atualiza despesa :' + JSON.stringify(err, undefined, 2)); }
    });
};

module.exports.deletar = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`Nenhum registro com o ID fornecido : ${req.params.id}`);

    Despesa.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Erro ao deletar despesa :' + JSON.stringify(err, undefined, 2)); }
    });
};