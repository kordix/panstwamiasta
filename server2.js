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

let connectcounter = 0;

io.on('connection', (socket) => {

    connectcounter++;

    socket.on('addPlayer', (player) => {
        socket.emit('addPlayer', (player))
        socket.broadcast.emit('addPlayer', (player))

    })

    socket.on('connectedClientClient', () => {
        socket.emit('connectedClients', connectcounter);
        socket.broadcast.emit('connectedClients', connectcounter);
    });

    socket.on('gameStarted',()=>{
        socket.broadcast.emit('gameStarted');
    })

    socket.on('disconnect', () => {
        connectcounter -= 1;
        socket.emit('connectedClients', connectcounter);
        socket.broadcast.emit('connectedClients', connectcounter);
    });

    socket.on('litera', (msg) => {
        socket.broadcast.emit('litera', msg);
    });

    socket.on('sendResults', (msg) => {
        // socket.emit('sendResults', msg);
        socket.broadcast.emit('sendResults', msg);

    });

    socket.on('setTimer', (msg)=>{
        console.log('emituje setTimer po stronie serwera');
        socket.emit('setTimer',msg)
        socket.broadcast.emit('setTimer', msg)

    })



});

server.listen(3002, () => {
    console.log('listening on *:3002');
});



app.get('/connectcounter', function (req, res) {
    res.send(`${connectcounter}`);

});

