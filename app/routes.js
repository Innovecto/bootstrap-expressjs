/*jslint node: true */
"use strict";

var express     = require('express');
var router      = express.Router();
var controller  = require('../helpers/controller');
var group       = require('../helpers/group')(router);
var passport    = require('passport');
var authIsLogin = require('./middleware/authIsLogin');

/**
 * Authentication for Etalascti handler
 */
router.post('/login',  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
}), controller('', 'auth', 'handleLogin'));

// This is Grouping for route
// you must include prefix to use this group routing
// but also you can add middleware 
group.routing({prefix: "/api/v1"}, function(route) {
    route({method:"post", url:"/login", callback: controller('api', 'auth', 'login')});
});

/* GET home page. */
router.get('/', controller('', 'home', 'index'));
router.get('/login', controller('', 'auth', 'index'));

/**
 * Admin Routing
 */
router.get('/admin', controller('admin', 'auth', 'index'));

module.exports = router;

