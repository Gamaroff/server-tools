var ncp = require('ncp').ncp;
var fs = require('fs');

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
        if (find instanceof Array) {

            for (var i = 0; i < find.length; i++) {
                var item = find[i];
                str = str.replace(new RegExp(item, 'g'), replace);
            }

            return str;

        } else {
            return str.replace(new RegExp(find, 'g'), replace);
        }
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

    self.trim = function(string) {
        return string.replace(/^\s*|\s*$/g, '')
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

    self.roundMinuteUp = function (date, interval) {

        date = moment.unix(date);

        var intervalsInMinute = 60 / interval;

        if (intervalsInMinute > 60 || intervalsInMinute < 0) {
            return null;
        }

        var intervals = Math.floor(date.minutes() / interval);
        if (date.minutes() % interval != 0) {
            intervals++;
        }
        if (intervals == intervalsInMinute) {
            date.add('hours', 1);
            intervals = 0;
        }
        date.minutes(intervals * interval);
        date.seconds(0);
        return date.unix();

    };

    self.roundMinuteDown = function (date, interval) {

        date = moment.unix(date);

        var intervalsInMinute = 60 / interval;

        if (intervalsInMinute > 60 || intervalsInMinute < 0) {
            return null;
        }

        var remainder = date.minutes() % interval;
        date.subtract('minutes', remainder);

        date.seconds(0);
        return date.unix();

    };

    self.write = function (name, path, data, callback) {
        fs.exists(path, function (exists) {
            if (!exists) {
                fs.mkdir(path, function (err) {

                    if (!err) {
                        writeFile(path, name, data, callback);
                    } else {
                        callback('Error creating directory: ' + err);
                    }

                });
            } else {
                writeFile(path, name, data, callback);
            }
        });

        var writeFile = function (path, name, data, callback) {
            fs.writeFile(path + '/' + name, data, function (err) {
                if (callback) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, true);
                    }
                }
            });
        }
    };



}

module.exports = new Tools();

