var should = require('chai').should();
var tools = require('../index').tools;
var json = require('../doc/sample.json');

console.log(JSON.stringify(tools.buildObject(json.result[0].fields, ['Person.PersonReferences', 'Person.Contacts.EmailAddresses'])));

