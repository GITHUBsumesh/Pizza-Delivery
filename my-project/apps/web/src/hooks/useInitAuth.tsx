"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { checkAuth } from "@/api/auth";

export const useInitAuth = () => {
  const setUser = useAuthStore((s) => s.setUser);
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);

  useEffect(() => {
    const init = async () => {
      try {
        const data = await checkAuth();
        if (data?.success) {
          setUser(data.user);
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        console.error("Auth init failed:", error);
        setAuthenticated(false);
      }
    };

    init();
  }, []);
};
