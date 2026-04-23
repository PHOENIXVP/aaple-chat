"use client";

import { useEffect, useState } from "react";
import socket from "../../lib/socket";
import ChatBox from "../../components/ChatBox";
import MessageInput from "../../components/MessageInput";
import UserList from "../../components/UserList";

export default function UsersPage() {
  const [users, setUsers] = useState({});
  const [selected, setSelected] = useState(null);
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("onlineUsers", setUsers);

    socket.on("privateMessage", (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => socket.off();
  }, []);

  const send = (msg) => {
    socket.emit("privateMessage", {
      to: selected,
      message: msg,
    });
  };

  return (
    <div className="p-5">
      <h1 className="text-xl">👥 Users</h1>

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
