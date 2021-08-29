var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var connection = require('./config/db.config')
var indexRouter = require('./routes/index');
var dotenv = require('dotenv')

connection.once('open', () => console.log('DB Connected'))
connection.on('error', () => console.log("error"))
dotenv.config();
var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


module.exports = app;
