const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./configs/config.js');

const app = express();
const port = process.env.PORT || 8080;


// const favicon = require('serve-favicon')

mongoose.connect(process.env.MONGODB || config.mongo);
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
const route = require('./routes/_routes')(app);
app.listen(port);
