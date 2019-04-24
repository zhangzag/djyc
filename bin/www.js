
var app = require('../app');
var debug = require('debug')('demo:server');
var http = require('http');

var server = http.createServer(app.callback());

const io = require('socket.io')(server);

// io.on('connection', client => {
//     client.on('event', data => { /* … */ });
//     client.on('disconnect', () => { /* … */ });
// });

server.listen(3002);
// server.on('error', onError);
// server.on('listening', onListening);



// socket连接
io.on('connection', (socket) => {
    console.log('client connect server, ok!');

    socket.on('chat message', (msg) => {
        console.log('message: '+msg);
        io.emit('chat message', msg);
    });

    //监听断开连接状态：socket的disconnect事件表示客户端与服务端断开连接
    socket.on('disconnect', () => {
        console.log('user disconnected - 用户断开链接了');
    });

    // io.emit()方法用于向服务端发送消息，参数1表示自定义的数据名，参数2表示需要配合事件传入的参数
    // socket.emit('chat message', { some: 'data' });
    io.emit('server message', {msg:'我是服务服务端'});

    //与客户端对应的接收指定的消息
    socket.on('client message', (data)=>{
        console.log(data);// 我是客户端发来的消息
    });
    socket.on('options', (data)=>{
        console.log('来自客户端的操作： ', data);// 
        
        io.emit('server message', {msg: data.msg});
    });

    //来自前端页面的事件
    socket.on('webOptions', (data)=>{
        console.log('来自前端页面的事件: ', data);
        //触发事件 通知电机遥控器
        io.emit('toDjData', data)
    });

    // socket.disconnect();
});



