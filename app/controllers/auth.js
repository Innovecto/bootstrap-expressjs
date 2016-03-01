/*jslint node: true */
"use strict";

var root = require('path').resolve();
var template = require(root + '/config/template');

exports.index = function(req, res) {
    return res.render('login', template);
};

exports.handleLogin = function(req, res) {

};