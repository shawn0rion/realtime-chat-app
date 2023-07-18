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
    console.log("cause event?");
    users[socket.id] = name;
    // let other users now that there is a new user
    socket.broadcast.emit("user-connected", name);
  });
  socket.on("send-chat-message", (message) => {
    // the output will be user: message, so pass object
    const user = users[socket.id];
    socket.broadcast.emit("chat-message", { message, name: user });
  });
});

// // listen for new message

// // listen for user disconnect
// socket.on("disconnect", () => {
//   socket.broadcast.emit("user-disconnected", users[socket.id]);
//   delete users[socket.id];
// });
//});
