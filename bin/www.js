
var app = require('../app');
var debug = require('debug')('demo:server');
var http = require('http');

var server = http.createServer(app.callback());

const io = require('socket.io')(server);

server.listen(3002);
// server.on('error', onError);
// server.on('listening', onListening);

// socket连接
io.on('connection', (socket) => {
    console.log('client connect server, ok!');

    //监听断开连接状态：socket的disconnect事件表示客户端与服务端断开连接
    socket.on('disconnect', () => {
        console.log('user disconnected - 用户断开链接了');
    });

    // io.emit()方法用于向服务端发送消息，参数1表示自定义的数据名，参数2表示需要配合事件传入的参数
    // io.emit('server message', {msg:'我是服务服务端'});

    //来自前端页面的事件
    socket.on('webOptions', (data)=>{
        console.log('来自前端页面的事件: ', data);
        //触发事件 通知电机遥控器
        io.emit('toDjData', data)
    });

    //来自电机遥控器操作返回来的数据
    socket.on('toWebData', (data)=>{
        console.log('来自电机遥控器操作返回的结果数据： ', data)
        //将电机响应数据传给微信界面
        io.emit('DjResponed', data);
    })

    // socket.disconnect();
});



