"use client";

type Message = {
  user: string,
  message: string,
};

export default function ChatBox({ messages }: { messages: Message[] }) {
  return (
    <div className="h-80 overflow-y-auto border p-3 rounded bg-gray-900 space-y-1">
      {messages.map((m, i) => (
        <p key={i}>
          <span className="text-green-400 font-semibold">{m.user}:</span>{" "}
          {m.message}
        </p>
      ))}
    </div>
  );
}
