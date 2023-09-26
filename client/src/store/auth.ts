import jwtDecode from "jwt-decode";
import { create } from "zustand";

import type { User } from "../types";

const useAuthStore = create<{
  user: User | null;
  setUser(user: User | null): void;
}>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

const profile = localStorage.getItem("profile");

if (profile) {
  const user = jwtDecode<User>(profile);
  useAuthStore.getState().setUser(user);
}

export default useAuthStore;
