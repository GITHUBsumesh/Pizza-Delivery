"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useProfile } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { LoadingScreen } from "./Home/loadingScreen";
import Unauthorized from "./Home/unAuthorizedScreen";

export default function AuthGuard({
  children,
  roleRequired,
}: {
  children: React.ReactNode;
  roleRequired: "admin" | "user";
}) {
  const router = useRouter();
  const { user, setUser, isAuthenticated } = useAuthStore();
  const { data, isLoading, isError } = useProfile();
  // console.log("data : ", data);
  // console.log("role required : ", roleRequired);
  // console.log("user :", user);
  // console.log("isAuthenticated :", isAuthenticated);

  // 🔥 First, set Zustand user if data is available
  useEffect(() => {
    if (!isLoading && data && !user) {
      setUser(data.user);
      // console.log("data : ", data);
      // console.log("role required : ", roleRequired);
      // console.log("user :", user);
      // console.log("isAuthenticated :", isAuthenticated);
    }
  }, [data, isLoading, user, setUser]);

  // 🔥 Handle logout (if token is missing or API fails)
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // console.log("Session expired. Please log in again.");
        toast.error("Session expired. Please log in again.");
        router.replace("/");
      }
    }
  }, [isAuthenticated, router]);

  if (isLoading) return <LoadingScreen />;

  // 🔥 If user role does not match, show error but DO NOT redirect
  if (isError || (user && user?.role !== roleRequired)) {
    // console.log("Unauthorized");
    toast.error("Unauthorized");
    return <Unauthorized />;
  }

  return <>{children}</>;
}
