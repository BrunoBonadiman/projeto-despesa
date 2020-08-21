var ObjectId = require('mongoose').Types.ObjectId;

var { Salario } = require('../models/salario-model');

module.exports.listar = (req, res, next) => {
    Salario.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Erro ao recuperar Salário :' + JSON.stringify(err, undefined, 2)); }
    });
};

module.exports.buscar = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`Nenhum registro com o ID fornecido : ${req.params.id}`);

    Salario.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Erro ao recuperar o Salario :' + JSON.stringify(err, undefined, 2)); }
    });
};

module.exports.somar = (req, res, next) => {
    Salario.aggregate([
        {
            $group: {  
                 _id: { id: '$id' },                
                valor: {
                    $sum: '$valor'
                }
            }
        },
        { $sort: {valor: 1} }
    ], function (err, docs) {
        if (err) return next(err);
        res.json(docs);
    });
};

module.exports.cadastrar = (req, res, next) => {
    var salario = new Salario({
        valor: req.body.valor,      
        mes: req.body.mes,
        ano: req.body.ano
    });
    salario.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Erro ao cadastrar salário :' + JSON.stringify(err, undefined, 2)); }
    });
};

module.exports.atualizar = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`Nenhum registro com o ID fornecido : ${req.params.id}`);

    var salario = {
        valor: req.body.valor,      
        mes: req.body.mes,
        ano: req.body.ano
    };
    Salario.findByIdAndUpdate(req.params.id, { $set: salario }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Erro ao atualiza salario :' + JSON.stringify(err, undefined, 2)); }
    });
};

module.exports.deletar = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`Nenhum registro com o ID fornecido : ${req.params.id}`);

    Salario.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Erro ao deletar salario :' + JSON.stringify(err, undefined, 2)); }
    });
};