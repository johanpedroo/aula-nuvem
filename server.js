const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const nomeRoute = require('./routes/nome');
const calculadoraRoute = require('./routes/calculadora');

const app = express();
const port = process.env.PORT || 8888;


// const favicon = require('serve-favicon')

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    next();
});
app.get('/', (req,res) => {
  res.json({status:"up", date: Date()})
})
app.use(cookieParser());

app.use('/rest/nomecompleto', nomeRoute);
app.use('/rest/calculadora', calculadoraRoute);

app.listen(port);
