var socketio = require('socket.io');

function Sockets() {
    'use strict';

    var self = this;
    var _socket;
    var _io;

    self.init = function (server) {

        _io = socketio.listen(server, { log : false });
        _io.sockets.on('connection', function (socket) {
            _socket = socket
            _socket.emit('connect', { status : true });

            _socket.on('join', function (data) {

                // check if client is already in a room
                var client = _io.sockets.manager.roomClients[socket.id];

                if (!client['/pos-' + data.id]) {
                    _socket.join('pos-' + data.id);
                    _io.sockets.in('pos-' + data.id).emit('joined', {id : data.id});
                }
            });
        });

    };

    self.emit = function (key, data) {
        _socket.emit(key, data);
    };

    self.sendToRoom = function (room, key, data) {
        _io.sockets.in(room).emit(key, data);
    };

}

module.exports = new Sockets();