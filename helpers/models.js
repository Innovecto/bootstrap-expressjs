/*jslint node: true */
"use strict";

/**
 *  models loader
 *
 *  Created by create caminte-cli script
 *  App based on CaminteJS
 *  CaminteJS homepage http://www.camintejs.com
 **/

var env = require('../.env.json');
var caminte = require('caminte');
var Schema = caminte.Schema;
var fs = require('fs');
var path = require('path');
var modelDir = path.resolve(__dirname, './../app/models');
var modelList = fs.readdirSync(modelDir);
var dbConf = require('../config/database');
var database = dbConf[env.db.driver];
var schema = new Schema(database.driver, database);

module.exports.init = function(app) {
    process.env.AUTOUPDATE = true;

    if (!app.models) {
        app.models = {};
    }

    for (var m = 0; m < modelList.length; m++) {
        var modelFile = modelList[m];
        if (/\.js$/i.test(modelFile)) {
            var modelName = modelFile.replace(/\.js$/i, '');
            app.models[modelName] = require(modelDir + '/' + modelName)(schema);
        }
    }

    if ('function' === typeof schema.autoupdate) {
        if (process.env.AUTOUPDATE) {
            schema.autoupdate(function(err) {
                if (err) {
                    console.log(err);
                }
            });
        }
    }
    return app;
};

module.exports.call = function(modelName, subdomain) {
    return require(modelDir + '/' + modelName + '.js')(schema);
};
module.exports.load = function(name, subdomain) {
    var model = this.call(name, subdomain);
    return model;
};
