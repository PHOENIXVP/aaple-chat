"use client";

import { useEffect, useState } from "react";
import socket from "../../lib/socket";
import { initSocket } from "../../lib/initSocket";
import ChatBox from "../../components/ChatBox";
import MessageInput from "../../components/MessageInput";
import UserList from "../../components/UserList";
import { Message, UsersMap } from "../types/chat";

export default function UsersPage() {
  const [users, setUsers] = useState<UsersMap>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [chat, setChat] = useState<Message[]>([]);

  useEffect(() => {
    initSocket(); // ✅ IMPORTANT

    const usersHandler = (data: UsersMap) => {
      setUsers(data);
    };

    const msgHandler = (data: Message) => {
      setChat((prev) => [...prev, data]);
    };

    socket.on("onlineUsers", usersHandler);
    socket.on("privateMessage", msgHandler);

    return () => {
      socket.off("onlineUsers", usersHandler);
      socket.off("privateMessage", msgHandler);
    };
  }, []);

  const send = (msg: string) => {
    if (!selected || !msg.trim()) return;

    socket.emit("privateMessage", {
      to: selected,
      message: msg,
    });
  };

  return (
    <div className="p-5">
      <h1 className="text-xl mb-3">👥 Users</h1>

      <UserList users={users} onSelect={setSelected} />

      {selected && (
        <>
          <ChatBox messages={chat} />
          <MessageInput onSend={send} />
        </>
      )}
    </div>
  );
}
