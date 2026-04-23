import { io } from "socket.io-client";

const socket = io("https://chat-backend-c5ve.onrender.com", {
  transports: ["websocket"],
});

export default socket;
