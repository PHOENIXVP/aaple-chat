"use client";

type User = {
  username: string,
};

export default function UserList({
  users,
  onSelect,
}: {
  users: Record<string, User>,
  onSelect: (id: string) => void,
}) {
  return (
    <div className="space-y-1">
      {Object.entries(users).map(([id, u]) => (
        <p
          key={id}
          onClick={() => onSelect(id)}
          className="cursor-pointer hover:text-blue-400"
        >
          {u.username}
        </p>
      ))}
    </div>
  );
}
