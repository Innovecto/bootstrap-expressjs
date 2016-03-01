/* jslint node: true */
"use strict";

var root = require('path').resolve();
var jwt = require('jsonwebtoken');
var env = require(root + '/helpers/env')();
var ApiResponse = require(root + '/app/etalastic/ApiResponse');
var models = require(root + '/helpers/models');


exports.login = function(req, res, next) {
    var response = new ApiResponse();
    var User = models.load('User');
    var token = '';
    User.find({ where: { email: req.body.email } }, function(err, users) {
        if (err) {
            response.setStatus(99);
            return res.status(400).json(response.getAll());
        }
        if (users.length <= 0) {
            response.setStatus(2);
            response.setData({ text: "User is not found" }, 'errors');

            return res.status(422).json(response.getAll());
        }

        if (users instanceof Array) {
            token = jwt.sign(users[0], env.appKey, {
                expiresIn: "7d"
            });
            response.setToken(token);
            response.setData(users[0], 'user');

            return res.status(200).json(response.getAll());
        } else {
            token = jwt.sign(users, env.appKey, {
                expiresIn: "7d"
            });
            response.setToken(token);
            response.setData(users, 'user');

            return res.status(200).json(response.getAll());
        }
    });
};
