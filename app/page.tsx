"use client";

import { useEffect, useState } from "react";
import socket from "../lib/socket";
import ChatBox from "../components/ChatBox";
import MessageInput from "../components/MessageInput";

type Message = {
  user: string;
  message: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    let name = localStorage.getItem("username");

    if (!name) {
      name = prompt("Enter your name") || "Anonymous";
      localStorage.setItem("username", name);
    }

    setUsername(name);

    socket.connect();
    socket.emit("join", name);

    const handler = (data: Message) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on("receiveGlobalMessage", handler);

    return () => {
      socket.off("receiveGlobalMessage", handler);
      socket.disconnect();
    };
  }, []);

  const send = (msg: string) => {
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
