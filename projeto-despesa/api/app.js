require('./config/config');
require('./models/database');
require('./config/passportConfig');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const userRouter = require('./routes/user-router');
const despesaRouter = require('./routes/despesa-router');
const salarioRouter = require('./routes/salario-router');

var app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/api', userRouter);
app.use('/api/despesa', despesaRouter);
app.use('/api/salario', salarioRouter);

app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    } else {
        console.log(err);
    }
});

app.listen(process.env.PORT, () => console.log(`Servidor iniciado na porta : ${process.env.PORT}`));