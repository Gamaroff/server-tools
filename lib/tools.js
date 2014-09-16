var ncp = require('ncp').ncp;

function Tools() {
    'use strict';

    var self = this;

    self.formatString = function (str, args) {
        var regex = new RegExp("{-?[0-9]+}", "g");

        var result = str.replace(regex, function (item) {
            var intVal = parseInt(item.substring(1, item.length - 1));
            var replace;
            if (intVal >= 0) {
                //replace = isNaN(args[intVal]) ? '\'' + args[intVal] + '\'' : args[intVal];
                replace = args[intVal];
            } else if (intVal === -1) {
                replace = "{";
            } else if (intVal === -2) {
                replace = "}";
            } else {
                replace = "";
            }
            return replace;
        });

        return result;

    };

    self.replaceAll = function (str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    };

    self.parseQueryString = function (querystring) {

        if (typeof querystring !== 'string') {
            return {err: 'Incorrectly formatted query'};
        }
        else {
            var str = querystring.split('&');
            var query = {};

            str.forEach(function (item) {
                var p = item.split('=');
                query[p[0]] = p[1];
            });

            return {query: query};
        }

    };

    self.isNullOrUndefined = function (value) {
        return null === value || undefined === value;
    };

    self.isEqual = function (obj1, obj2) {
        var result = true;

        for (var prop in obj1) {
            if (obj2[prop] !== obj1[prop]) {
                result = false;
            }
        }

        return result;
    };

    self.makeId = function (str) {
        var low = str.toLowerCase();
        return self.replaceAll(low, ' ', '_');
    };

    self.copyFile = function (source, target, callback) {
        ncp(source, target, function (err) {
            if (err) {
                callback(err);
            }
            callback();
        });
    };

}

module.exports = new Tools();

