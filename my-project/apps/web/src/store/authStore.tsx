import { User } from "@/utils/models";
import { create } from "zustand";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  logoutUser: () => void;
};
const checkToken = () => {
  // Check for token (either in cookies or localStorage)
  const token = localStorage.getItem("token") || document.cookie; // Adjust this depending on where your token is stored
  return !!token; // If token exists, return true (authenticated)
};
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: checkToken(),
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logoutUser: () => {
    localStorage.removeItem("token");
    set({ user: null, isAuthenticated: false });
  },
}));
