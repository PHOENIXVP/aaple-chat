import { useState } from "react";

export default function MessageInput({ onSend }) {
  const [msg, setMsg] = useState("");

  return (
    <div className="flex gap-2 mt-2">
      <input
        className="flex-1 p-2 rounded text-black"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />
      <button
        onClick={() => {
          onSend(msg);
          setMsg("");
        }}
        className="bg-blue-500 px-4 py-2 rounded"
      >
        Send
      </button>
    </div>
  );
}
