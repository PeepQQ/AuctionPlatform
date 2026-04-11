import { io, Socket } from "socket.io-client";

declare global {
  interface Window {
    socket: Socket;
  }
}

let socket: Socket;

if (typeof window !== "undefined") {
  socket =
    window.socket ??
    io("http://localhost:5005");

  window.socket = socket;
}

export { socket };