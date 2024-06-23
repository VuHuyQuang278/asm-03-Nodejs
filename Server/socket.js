const Server = require("socket.io").Server;
const http = require("http");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const server = http.createServer(app);
const io = new Server(server);

const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != "undefined") userSocketMap[userId] = socket.id;

  // socket.on() is used to listen to the events. can be used both on client and server side
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
  });
});

module.exports = { app, io, server, getReceiverSocketId };
