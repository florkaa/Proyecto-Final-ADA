var express = require('express');
var path = require('path');
var cors = require('cors');
var app = express();
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));

app.options('*', cors())

module.exports = app;
