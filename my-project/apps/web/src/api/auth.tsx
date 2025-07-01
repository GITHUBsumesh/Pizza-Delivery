import { createAxiosInstance } from "@/utils/axiosInstance";
export type user = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: "admin" | "user";
  phoneNumber? : string;
  address?: string;
  profilePic?: string;
};

export const authApi = createAxiosInstance("/auth");

export const login = async ({ item }: { item: user }) => {
  const { data } = await authApi.post("/login", item);
  return data;
};
export const signup = async ({ item }: { item: user }) => {
  const { data } = await authApi.post("/signup", item);
  return data;
};
export const logout = async () => {
  const { data } = await authApi.post("/logout");
  return data;
};
export const getMyProfile = async () => {
  const { data } = await authApi.get("/profile");
  return data;
};
export const checkAuth = async () => {
  const { data } = await authApi.get("/me");
  return data;
};
export const updateProfile = async ({ item }: { item: user })=>{
  const {data} = await authApi.put("/profile/update",item)
  return data;
}
export const forgotPassword = async ({ email }: { email: string }) => {
  const { data } = await authApi.post("/forgot-password", { email });
  return data;
}
export const resetPassword = async ({ token, newPassword }: { token: string, newPassword: string }) => {
  const { data } = await authApi.post(`/reset-password?token=${token}`, { newPassword });
  return data;
}
export const verifyEmail = async ({ token }: { token: string }) => {
  const { data } = await authApi.get(`/verify-email?token=${token}`);
  return data;
}
export const resendVerificationEmail = async ({ email }: { email: string }) => {
  const { data } = await authApi.post("/resend-verification", { email });
  return data;
}
