import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  login,
  signup,
  logout,
  getMyProfile,
  user,
  updateProfile,
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendVerificationEmail,
} from "@/api/auth";
import { useAuthStore } from "@/store/authStore";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
export const useLogin = () => {
  const { setUser } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: user) => login({ item: user }),
    onSuccess: (response) => {
      if (response.success) {
        const userData = response.user; // Correctly access `user` from API response
        setUser(userData);
        queryClient.setQueryData(["me"], userData); // Instant UI update
        toast.success(response.message || "Login successful!");
      } else {
        toast.error(response.message || "Login failed!");
      }
    },
    onError: (error: AxiosError) => {
      // Handle error properly
      const errorMessage =
        (error.response?.data as { message: string })?.message ||
        "Login failed";
      toast.error(errorMessage);
    },
  });
};

export const useSignup = () => {
  const { setUser } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: user) => signup({ item: user }),
    onSuccess: (response) => {
      if (response.success) {
        const userData = response.user; // Correctly access `user` from API response
        setUser(userData);
        queryClient.setQueryData(["me"], userData); // Instant UI update

        toast.success(response.message || "Login successful!");
      } else {
        toast.error(response.message || "Login failed!");
      }
    },
    onError: (error: AxiosError) => {
      const errorMessage =
        (error.response?.data as { message: string })?.message ||
        "Login failed";
      toast.error(errorMessage);
    },
  });
};

export const useLogout = () => {
  const { logoutUser } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["me"] });
      queryClient.setQueryData(["me"], null); // Optimistic update
    },
    onSuccess: (response) => {
      if (response.success) {
        logoutUser();
        toast.success(response.message || "Login successful!");
      } else {
        toast.error(response.message || "Login failed!");
      }
    },
    onError: (error: AxiosError) => {
      const errorMessage =
        (error.response?.data as { message: string })?.message ||
        "Logout failed";
      toast.error(errorMessage);
    },
  });
};

export const useProfile = () => {
  const { user, setUser } = useAuthStore();
  // console.log(user);
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      if (user) return user; // 🔥 Use Zustand first, fetch only if user is missing
      const data = await getMyProfile();
      if (data.success) {
        setUser(data.user);
      }
      return data.user;
    },
    staleTime: 60 * 60 * 1000,
  });
};

export const useUpdateProfile = () => {
  const { setUser } = useAuthStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: user) => updateProfile({ item: user }),
    onSuccess: (response) => {
      if (response.success) {
        const userData = response.user; // Correctly access `user` from API response
        setUser(userData);
        queryClient.setQueryData(["me"], userData); // Instant UI update
        toast.success(response.message || "Profile Updated Successfully!");
      } else {
        toast.error(response.message || "Profile Update Failed!");
      }
    },
    onError: (error: AxiosError) => {
      // Handle error properly
      const errorMessage =
        (error.response?.data as { message: string })?.message ||
        "Profile Update failed";
      toast.error(errorMessage);
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email: string) => forgotPassword({ email }),
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message || "Password reset email sent!");
      } else {
        toast.error(response.message || "Failed to send reset email");
      }
    },
    onError: (error: AxiosError) => {
      const errorMessage =
        (error.response?.data as { message: string })?.message ||
        "Failed to send reset email";
      toast.error(errorMessage);
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({
      token,
      newPassword,
    }: {
      token: string;
      newPassword: string;
    }) => resetPassword({ token, newPassword }),
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message || "Password reset successfully!");
      } else {
        toast.error(response.message || "Failed to reset password");
      }
    },
    onError: (error: AxiosError) => {
      const errorMessage =
        (error.response?.data as { message: string })?.message ||
        "Failed to reset password";
      toast.error(errorMessage);
    },
  });
};

export const useVerifyEmail = (token: string | null) => {
  return useQuery({
    queryKey: ["verify-email", token],
    queryFn: async () => {
      if (!token) throw new Error("No verification token provided");
      const data= await verifyEmail({ token });
      return data.user
    },
    enabled: !!token, // Only run query when token exists
    retry: false,
  });
};
export const useResendVerificationEmail = () => {
  return useMutation({
    mutationFn: (email: string) => resendVerificationEmail({ email }),
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message || "Verification email sent!");
      } else {
        toast.error(response.message || "Failed to send verification email");
      }
    },
    onError: (error: AxiosError) => {
      const errorMessage =
        (error.response?.data as { message: string })?.message ||
        "Failed to send verification email";
      toast.error(errorMessage);
    },
  });
};
