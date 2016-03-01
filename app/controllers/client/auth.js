/*jslint node: true */
"use strict";

var express = require('express');
var home = express.Router();
var root = require('path').resolve();
var models = require(root +'/helpers/models');

exports.index = function(req, res) {
    var clientName = req.params.domain;
    var User = models.load('User', clientName);

    return res.render('index', {
        title: clientName
    });
};
