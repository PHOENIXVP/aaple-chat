"use client";

import { useEffect, useState } from "react";
import socket from "../../lib/socket";
import ChatBox from "../../components/ChatBox";
import MessageInput from "../../components/MessageInput";

export default function RandomPage() {
  const [roomId, setRoomId] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("matched", (data) => {
      setRoomId(data.roomId);
    });

    socket.on("randomMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("partnerLeft", () => {
      alert("Partner disconnected");
      setRoomId(null);
      setMessages([]);
    });

    return () => socket.off();
  }, []);

  const find = () => {
    socket.emit("findPartner");
  };

  const send = (msg) => {
    socket.emit("randomMessage", { roomId, message: msg });
  };

  return (
    <div className="p-5">
      <h1 className="text-xl mb-3">🎲 Random Chat</h1>

      {!roomId ? (
        <button onClick={find} className="bg-green-500 p-2 rounded">
          Find Partner
        </button>
      ) : (
        <>
          <ChatBox messages={messages} />
          <MessageInput onSend={send} />
        </>
      )}
    </div>
  );
}
