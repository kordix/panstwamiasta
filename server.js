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
    console.log(connectcounter);










    const io = require('socket.io')();

    // console.log(`Number of connected clients: ${Object.keys(io.sockets.connected).length}`);

    // socket.emit('connectedClients', connectcounter);

    socket.on('connectedClientClient', () => {
        console.log('nasłuchuje i emituje po stronie serwera');
        console.log('clientclient', connectcounter);
        // socket.emit('connectedClient', connectcounter);

        socket.emit('connectedClients', connectcounter);

        socket.broadcast.emit('connectedClients', connectcounter);
    });


    socket.on('disconnect', () => {
        connectcounter -= 1;
        console.log(connectcounter);

        socket.emit('connectedClients', connectcounter);
        socket.broadcast.emit('connectedClients', connectcounter);


    });

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

    socket.on('nextround', (dane) => {
        socket.broadcast.emit('nextround', dane);
    });



});

server.listen(3001, () => {
    console.log('listening on *:3001');
});



app.get('/connectcounter', function (req, res) {
    res.send(`${connectcounter}`);

});

