/* jslint node: true */
"use strict";

module.exports = function(namespace, fileName, method) {
    var file = [];
    try {
        if (namespace !== undefined) {
            file = require('../app/controllers/' + namespace + '/' + fileName);
        } else {
            file = require('../app/controllers/' + fileName);
        }
    }catch(e) {
        console.error("Undefined controller method: '" + fileName + "." + method + "'");
        console.log(e);
    }
    if (file[method] === undefined) {
        process.exit(1);
    }
    return file[method];
};
