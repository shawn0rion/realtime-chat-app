// socket.io.js
const socket = io("http://localhost:3000");

// get elements
const messageContainer = document.querySelector("#message-container");
const messageForm = document.querySelector("#message-form");
const messageInput = document.querySelector("#message-input");
const header = document.querySelector("header");
// browser execution is stopped
const yourName = prompt("What is your name?");

let recentSender = "";

socket.emit("new-user", yourName);
socket.on("chat-message", (data) => {
  const { message, name } = data;

  if (recentSender === name) {
    appendMessage("", message, "other");
  } else {
    appendMessage(name, `${message}`, "other");
  }
  recentSender = name;
});

socket.on("user-connected", (name) => {
  console.log(`${name} has joined.`);
  header.textContent = `${name} has joined.`;
  setTimeout(() => {
    header.textContent = " ";
  }, 3000);
});

// form submit
// creates a user message
messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage("", message, "user");
  messageInput.value = "";
  socket.emit("send-chat-message", message, yourName);
  // reset input
});

function appendMessage(name, message, user) {
  console.log(`appending message: ${message}, ${name}, ${user}`);
  if (name !== "") {
    const nameElement = document.createElement("span");
    nameElement.classList.add("name");
    nameElement.textContent = name;
    messageContainer.appendChild(nameElement);
  }
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", user);
  messageElement.textContent = message;
  messageContainer.appendChild(messageElement);
}
