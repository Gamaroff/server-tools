var moment = require('moment');

module.exports = function () {
    'use strict';

    var self = this;

    self.error = function (message) {
        console.log(new Date() + ' - [ERROR]: ' + message);
    };

    self.info = function (message) {
        console.log(new Date() + ' - [INFO]: ' + message);
    };

    self.warn = function (message) {
        console.log(new Date() + ' - [WARN]: ' + message);
    };

};
