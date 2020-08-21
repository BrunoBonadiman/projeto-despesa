const mongoose = require('mongoose');

var Despesa = mongoose.model('Despesa', {
       descricao: {
        type: String,
        required: true
    },
    valor: {
        type: Number,
        required: true
    },
    vencimento: {
        type: String,
        required: true
    },
    observacao: {
        type: String,
        required: true
    },
    mes: {
        type: String,
        required: true
    },
    ano: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    } 
});

module.exports = { Despesa };