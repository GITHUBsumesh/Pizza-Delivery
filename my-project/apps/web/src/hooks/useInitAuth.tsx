'use client';
// /hooks/useInitAuth.ts

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export const useInitAuth = () => {
  const setUser = useAuthStore((s) => s.setUser);
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/me`, {
      credentials: "include", // Send cookies
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.user) {
          setUser(data.user);
        } else {
          setAuthenticated(false);
        }
      })
      .catch(() => setAuthenticated(false));
  }, []);
};
