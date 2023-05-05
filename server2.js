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
        console.log('nasłuchuje i emituje po stronie serwera');
        console.log('clientclient', connectcounter);
        // socket.emit('connectedClient', connectcounter);

        socket.emit('connectedClients', connectcounter);

        socket.broadcast.emit('connectedClients', connectcounter);
    });

    socket.on('disconnect', () => {
        connectcounter -= 1;
        socket.emit('connectedClients', connectcounter);
        socket.broadcast.emit('connectedClients', connectcounter);
    });



});

server.listen(3001, () => {
    console.log('listening on *:3001');
});



app.get('/connectcounter', function (req, res) {
    res.send(`${connectcounter}`);

});

