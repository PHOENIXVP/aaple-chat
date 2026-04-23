"use client";

import { useEffect, useState } from "react";
import socket from "../../lib/socket";
import { initSocket } from "../../lib/initSocket";
import ChatBox from "../../components/ChatBox";
import MessageInput from "../../components/MessageInput";
import { Message, MatchData } from "../types/chat";

export default function RandomPage() {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    initSocket(); // ✅ IMPORTANT

    const handleMatch = (data: MatchData) => {
      console.log("🎉 MATCHED:", data);
      setRoomId(data.roomId);
      setMessages([]);
    };

    const handleMessage = (data: Message) => {
      console.log("💬 RECEIVED:", data);
      setMessages((prev) => [...prev, data]);
    };

    const handleLeave = () => {
      alert("Partner disconnected");
      setRoomId(null);
      setMessages([]);
    };

    socket.on("matched", handleMatch);
    socket.on("randomMessage", handleMessage);
    socket.on("partnerLeft", handleLeave);

    return () => {
      socket.off("matched", handleMatch);
      socket.off("randomMessage", handleMessage);
      socket.off("partnerLeft", handleLeave);
    };
  }, []);

  const find = () => {
    console.log("🔍 FIND PARTNER");
    socket.emit("findPartner");
  };

  const send = (msg: string) => {
    if (!roomId || !msg.trim()) return;

    setMessages((prev) => [...prev, { user: "You", message: msg }]);

    socket.emit("randomMessage", {
      roomId,
      message: msg,
    });
  };

  return (
    <div className="p-5">
      <h1 className="text-xl mb-3">🎲 Random Chat</h1>

      {!roomId ? (
        <button onClick={find} className="bg-green-500 px-4 py-2 rounded">
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
