const { Server } = require('socket.io');
const { createServer } = require('http');
const express = require('express');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

  
io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on('join', function (data) {
      socket.join(data.recipient);
    });

    socket.on("privateMessage", (data) => {
      const { recipient, message } = data;
      io.to(recipient).emit("privateMessage", message);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
});

const port = 3001; // Replace with your desired port number
httpServer.listen(port, () => {
  console.log(`Socket.IO server running on port ${port}`);
});
