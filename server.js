const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./configs/config.js');
const jwt = require('express-jwt');

const userRoute = require('./routes/user');
const nomeRoute = require('./routes/nome');
const authRoute = require('./routes/authentication');
const forgotPasswordRoute = require('./routes/forgotPassword');
//const authentication = require('./middlewares/authenticationMiddleware')

const app = express();
const port = process.env.PORT || 8888;


// const favicon = require('serve-favicon')

mongoose.connect(config.mongo);
// view engine setup
// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
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
//app.use(jwt({ secret: config.JWT_PASSWORD }).unless({ path: ['/v1/user', '/v1/login'] }));
require('./middlewares/errors.js')(app)

app.use('/v1/user', userRoute);
app.use('/v1/nome', nomeRoute);
app.use('/v1/', authRoute);
app.use('/v1/', forgotPasswordRoute);

app.listen(port);
