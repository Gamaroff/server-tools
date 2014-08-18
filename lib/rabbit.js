var rabbitConfig = require('config').Rabbit;
var amqp = require('amqp');

function Rabbit() {
    'use strict';

    var self = this;
    var _connection;

    self.init = function (callback) {

        _connection = amqp.createConnection(rabbitConfig);

        _connection.on('ready', function () {

            if (callback)
                callback();
        });

    };

    self.listen = function (queueName, subscribe) {

        _connection.queue(queueName, {autoDelete : false, durable : true}, function (queue) {

            console.log('binding to queue');

            // Catch all messages
            queue.bind('#');

            queue.subscribe(function (message, headers, deliveryInfo) {
                subscribe(message, headers, deliveryInfo);
            });

        });
    };

    self.send = function (queueName, data, callback) {
        _connection.publish(queueName, data, {confirm : true}, function (err, result) {
            callback(err, result);
        });
        _connection.end();
    };

}

module.exports = new Rabbit();