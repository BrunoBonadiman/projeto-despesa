const mongoose = require('mongoose');

var Salario = mongoose.model('Salario', {
    id:{
        type: String
    },
    valor:{
        type: Number,
        required: true
    },
    mes:{
        type: String,
        required: true
    },
    ano:{
        type: String,
        required: true
    }
      
});

module.exports = { Salario };