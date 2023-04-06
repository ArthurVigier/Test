const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });

  socket.on('message', (message) => {
    console.log(`New message: ${message}`);

    // Broadcast the message to all other connected clients
    socket.broadcast.emit('message', message);
  });
});

server.listen(4008, () => {
  console.log('Server started on port 4008');
});
