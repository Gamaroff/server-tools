var tools = require('./lib/tools');
var mongoRepo = require('./lib/mongoRepository');
var mongoModel = require('./lib/mongoModel');
var logger = require('./lib/logger');
var blob = require('./lib/blobStorage');
var promises = require('./lib/promises');
var promise = require('./lib/promise');
var rabbit = require('./lib/rabbit');
var sockets = require('./lib/sockets');
var mailer = require('./lib/mailer');
var prototypes = require('./lib/prototypes');

module.exports = {
    tools           : tools,
    mongo_repository: mongoRepo,
    mongo_model     : mongoModel,
    logger          : logger,
    mailer          : mailer,
    blob_storage    : blob,
    promises        : promises,
    promise         : promise,
    sockets         : sockets,
    rabbit          : rabbit
};