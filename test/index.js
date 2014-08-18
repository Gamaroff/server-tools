var should = require('chai').should();
var tools = require('../index').tools;

describe('#formatString', function () {
    it('return Lorien is Awesome', function () {
        tools.formatString('{0} is {1}', ['Lorien', 'Awesome']).should.equal('Lorien is Awesome');
    });
});

