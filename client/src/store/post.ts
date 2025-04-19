import { create } from "zustand";

import type { Post } from "../types";

const usePostStore = create<{
  currentPost: Post | null;
  setCurrentPost(newPost: Post | null): void;
}>((set) => ({
  currentPost: null,
  setCurrentPost: (newPost) => set({ currentPost: newPost }),
}));

export default usePostStore;
