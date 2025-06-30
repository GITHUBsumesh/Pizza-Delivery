import { User } from "@/utils/models";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useEffect } from "react";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  logoutUser: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false, // initialized as false; will update client-side
      setUser: (user: User) => {
        set({ user, isAuthenticated: !!user });
      },
      logoutUser: () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
        }
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-store", // localStorage key
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
