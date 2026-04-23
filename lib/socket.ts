import { io, Socket } from "socket.io-client";

const SOCKET_URL = "https://chat-backend-c5ve.onrender.com";

let socket: Socket;

declare global {
  interface Window {
    _socket?: Socket;
  }
}

if (typeof window !== "undefined") {
  if (!window._socket) {
    window._socket = io(SOCKET_URL, {
      transports: ["websocket"],
      autoConnect: false,
      reconnection: true,
    });
  }
  socket = window._socket;
} else {
  // fallback (SSR safe)
  socket = {} as Socket;
}

export default socket;
