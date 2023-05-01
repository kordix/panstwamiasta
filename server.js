const express = require('express');
const app = express();
app.use(express.static('public'));
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });


io.on('connection', (socket) => {

    socket.on('choseplayer', (player) => {
        socket.broadcast.emit('choseplayer', player);
    });

    socket.on('test', (msg) => {
        socket.broadcast.emit('test', msg);
    });


    socket.on('test2', (msg) => {
        socket.broadcast.emit('test2', msg);
    });

    socket.on('litera', (msg) => {
        socket.broadcast.emit('litera', msg);
    });

    socket.on('applyPlayer1', (dane) => {
        socket.broadcast.emit('applyPlayer1', dane);
    });

    socket.on('applyPlayer2', (dane) => {
        socket.broadcast.emit('applyPlayer2', dane);
    });

    socket.on('setTimer', (dane) => {
        socket.broadcast.emit('setTimer', dane);
    });


});

server.listen(3000, () => {
    console.log('listening on *:3000');
});





