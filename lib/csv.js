var c = require('csv');

function csv() {
    'use strict';

    var self = this;

    self.toJSON = function (path, callback) {
        var records = [];
        var properties;

        c().from.path(path)
            .on('data', function (row) {

            })
            .on('record', function (row, index) {
                if (index === 0) {
                    properties = row;
                } else {
                    var columns = row;

                    var obj = {};

                    for (var i = 0; i < properties.length; i++) {
                        obj[properties[i]] = columns[i];
                    }
                    records.push(obj);
                }

            })
            .on('end', function (count) {
                callback(null, records);
            })
            .on('error', function (error) {
                callback(error.message);
            });
    };

}

module.exports = new csv();