/* jslint node: true */
"use strict";

var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var _ = require("underscore");
var fsr = require('file-stream-rotator');

var env = require('./.env.json');
var models = require('./helpers/models');
var routes = require('./app/routes');

// Model Initialitation
models.init(app);

/**
 * Express Init
 */

// view engine setup
app.set('views', path.join(__dirname, './app/views'));
app.set('view engine', 'hjs');
app.set('layout', 'layout');
app.enable('view cache');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, './public', 'favicon.ico')));

// Logging change to daily 
var logDirectory = __dirname + '/storage/logs';
// ensure log directory exists
var logDir = fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a rotating write stream
var accessLogStream = fsr.getStream({
    date_format: 'YYYYMMDD',
    filename: logDirectory + '/access-%DATE%.log',
    frequency: 'daily',
    verbose: false
});
app.use(logger('combined', {
    stream: accessLogStream
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

// Setting up session
app.use(session({
    secret: env.appKey,
    resave: false,
    saveUninitialized: false
}));
// app.use(express.static(path.join(__dirname + 'public')));
app.use(express.static('public'));

// Setting up routes
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (env.appEnv === 'development' || env.appEnv === 'local') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        // res.render('error', {
        //   message: err.message,
        //   error: err
        // });
        res.send(err.message);
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
