export type Comment = { id: string; user: string; text: string; createdAt: string };

export type Post = {
  id: string;
  user: string;
  text: string;
  avatar?: string;
  createdAt?: string;
  likes?: number;
  likedByYou?: boolean;
  comments?: Comment[];
  bookmarked?: boolean;
};

export type User = {
  name: string;
  bio?: string;
  avatarUrl?: string;
};


