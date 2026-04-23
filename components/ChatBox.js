export default function ChatBox({ messages }) {
  return (
    <div className="h-80 overflow-y-auto border p-3 rounded bg-gray-900">
      {messages.map((m, i) => (
        <p key={i}>
          <span className="text-green-400">{m.user}:</span> {m.message}
        </p>
      ))}
    </div>
  );
}
