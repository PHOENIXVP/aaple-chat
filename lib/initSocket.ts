import socket from "./socket";

export const initSocket = (): string => {
  if (!socket.connected) {
    socket.connect();
  }

  let username = localStorage.getItem("username");

  if (!username) {
    username = prompt("Enter your name") || "Anonymous";
    localStorage.setItem("username", username);
  }

  socket.emit("join", username);

  return username;
};
