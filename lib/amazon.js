function Amazon() {
    'use strict';

    var self = this;

    self.dynamoObject = function (table, data) {

        var obj = {
            TableName: table,
            Item     : {}
        };

        for (var property in data) {

            switch (typeof data[property]) {
                case 'number':
                    obj.Item[property] = { N: data[property] };
                    break;
                case 'string':
                    obj.Item[property] = { S: data[property] };
                    break;
                default :
                    break;
            }

        }

        return obj;

    };

}

module.exports = new Amazon();