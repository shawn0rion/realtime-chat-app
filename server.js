// include all of our dependencies
const cors = require("cors");

const io = require("socket.io")(3000, {
  cors: {
    origin: "*", // allow all origins
    method: ["GET", "POST"],
  },
});
// const io = require("socket.io")(3000);

// create object with socket id as a key
const users = {};

io.on("connection", (socket) => {
  socket.on("new-user", (name) => {
    users[socket.id] = name;
    // send event to everyone else
    socket.broadcast.emit("user-connected", name);
  });

  // listen for user message from client
  socket.on("send-chat-message", (message) => {
    // send event to everyone else
    const user = users[socket.id];
    socket.broadcast.emit("chat-message", { message, name: user });
  });

  // listen for user disconnect from client
  socket.on("disconnect", () => {
    // send event to everyone else
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  });
});
