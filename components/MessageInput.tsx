"use client";

import { FormEvent, useState } from "react";

export default function MessageInput({
  onSend,
}: {
  onSend: (msg: string) => void;
}) {
  const [msg, setMsg] = useState("");

  const handleSend = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!msg.trim()) return;
    onSend(msg);
    setMsg("");
  };

  return (
    <form className="flex gap-2 mt-2" onSubmit={handleSend}>
      <input
        className="flex-1 p-2 rounded text-black"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Type a message..."
      />
      <button type="submit" className="bg-blue-500 px-4 py-2 rounded">
        Send
      </button>
    </form>
  );
}
