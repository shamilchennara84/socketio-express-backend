import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import "dotenv/config";

// Create an Express app
const app = express();

// Create an HTTP server using the Express app
const server = createServer(app);

// Create a Socket.IO instance attached to the HTTP server
const io = new Server(server);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`App connected to backend on port ${port}`);
});


io.on("connection", (socket) => {
  socket.on("join", ({ room }) => {
    socket.join(room);
    socket.broadcast.to(room).emit("user joined");
  });

  socket.on("message", ({ room, user, message }) => {
    io.in(room).emit("new message", { user, message });
  });
});
