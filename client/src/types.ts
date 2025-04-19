export interface User {
  iat: number;
  exp: number;
  userId: string;
  email: string;
  username: string;
}

export interface Post {
  _id: string;
  title: string;
  description: string;
  image: string;
  creator: string;
  createdAt: string;
  likes: string[];
  tags: string[];
}
