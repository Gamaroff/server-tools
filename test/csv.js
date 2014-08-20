var tools = require('../index').csv_tools;

describe('#formatString', function () {
    it('return JSON', function () {

        var appDir = __dirname.substr(0, __dirname.lastIndexOf('/'));
        tools.toJSON(appDir + '/doc/csv.csv', function (err, result) {
            console.log(result);
        });

    });
});

