export type Message = {
  user: string;
  message: string;
  time?: string;
};

export type MatchData = {
  roomId: string;
  users: string[];
};

export type User = {
  username: string;
};

export type UsersMap = Record<string, User>;
