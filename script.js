// socket.io.js
const socket = io("http://localhost:3000");

// get elements
const messageContainer = document.querySelector("#message-container");
const messageForm = document.querySelector("#message-form");
const messageInput = document.querySelector("#message-input");

socket.on("chat-message", (data) => {
  console.log(data);
});

// form submit
// creates a user message
messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(message, "user");
  messageInput.value = "";
  // reset input
});

function appendMessage(message, user) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", user);
  messageElement.textContent = message;
  messageContainer.appendChild(messageElement);
}
