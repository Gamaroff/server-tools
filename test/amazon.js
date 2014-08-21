var expect = require('chai').expect;
var should = require('chai').should();
var amazon = require('../index').amazon;

describe('AWS Dynamo Object', function () {
    it('return an object with correct types', function () {

        var obj = new amazon.dynamoObject('people', {
            name   : 'Lorien',
            age    : 37
        });

        expect(obj).to.be.an('object');
        expect(obj).to.deep.equal({
            TableName: 'people',
            Item     : {
                name   : { 'S': 'Lorien' },
                age    : { 'N': 37 }
            }
        });
    });
});

