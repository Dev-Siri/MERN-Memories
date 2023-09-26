import axios from "axios";

import type { Post, User } from "../types";

export interface UserFormData extends User {
  password: string;
}

const rawToken = localStorage.getItem("profile");

export const API = axios.create({
  baseURL: "https://mern-memories-siri.onrender.com",
  headers: {
    Authorization: rawToken ? `Bearer ${rawToken}` : null,
  },
});

export async function fetchPosts() {
  const response = await API.get("/posts");

  return response.data.posts as Post[];
}

type PostFormData = Omit<Post, "createdAt" | "likes" | "_id">;

interface LikeArgs {
  postId: string;
  userId: string;
}

interface UpdateArgs {
  post: PostFormData;
  postId: string;
}

export const createPost = (post: PostFormData) => API.post("/posts", post);
export const updatePost = ({ post, postId }: UpdateArgs) =>
  API.put(`/posts/${postId}/update`, post);
export const likePost = ({ postId, userId }: LikeArgs) =>
  API.patch(`/posts/${postId}/like?userId=${userId}`);
export const deletePost = (postId: string) =>
  API.delete(`/posts/${postId}/delete`);
export const signup = (user: UserFormData) => API.post("/users/signup", user);
export const login = (user: Omit<UserFormData, "username">) =>
  API.post("/users/login", user);
