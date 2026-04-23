export default function UserList({ users, onSelect }) {
  return (
    <div>
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
