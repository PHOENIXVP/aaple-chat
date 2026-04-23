"use client";

import { useEffect, useState } from "react";
import socket from "../lib/socket";
import ChatBox from "../components/ChatBox";
import MessageInput from "../components/MessageInput";

export default function Home() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const name = prompt("Enter your name");
    socket.emit("join", name);

    socket.on("receiveGlobalMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off();
  }, []);

  const send = (msg) => {
    socket.emit("sendGlobalMessage", msg);
  };

  return (
    <div className="p-5">
      <h1 className="text-xl mb-3">🌍 Global Chat</h1>
      <ChatBox messages={messages} />
      <MessageInput onSend={send} />
    </div>
  );
}
