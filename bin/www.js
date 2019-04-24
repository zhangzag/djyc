
var app = require('../app');
var debug = require('debug')('demo:server');
var http = require('http');

var server = http.createServer(app.callback());

const io = require('socket.io')(server);
// socket连接
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message: '+msg);
        // io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3002);
// server.on('error', onError);
// server.on('listening', onListening);






