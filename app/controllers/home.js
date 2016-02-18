/* jslint node: true */
var express = require('express');
var home = express.Router();
var root = require('path').resolve();
var caminte = require(root + '/helpers/models');
var template = require(root + '/config/template');

var Post = caminte.load('Post');

exports.index = function(req, res) {
    "use strict";
    return res.render('index', template);
};
