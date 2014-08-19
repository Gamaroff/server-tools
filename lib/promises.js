var Q = require('q');

function Promises() {
    'use strict';

    var self = this;

    self.query = function (type, query, sort, limit, projection) {
        var deferred = Q.defer();
        type.query(query, sort, limit, projection, function (err, result) {
            if (err)
                deferred.reject(err);
            else
                deferred.resolve(result);

        });
        return deferred.promise;
    };


}

module.exports = new Promises();