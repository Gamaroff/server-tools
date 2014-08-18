var tools = require('./lib/tools');
var mongoRepo = require('./lib/mongoRepository');
var logger = require('./lib/logger');

module.exports = {
    tools           : new tools(),
    mongo_repository: mongoRepo,
    logger          : new logger()
};