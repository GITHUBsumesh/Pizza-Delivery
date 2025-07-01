import { User } from "@/utils/models";
import { create } from "zustand";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  logoutUser: () => void;
  setAuthenticated: (status: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: true }),
  logoutUser: () => {
    set({ user: null, isAuthenticated: false });
  },
  setAuthenticated: (status) => set({ isAuthenticated: status }),
}));
