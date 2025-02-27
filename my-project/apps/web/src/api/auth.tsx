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

export const userApi = createAxiosInstance("/auth");

export const login = async ({ item }: { item: user }) => {
  const { data } = await userApi.post("/login", item);
  return data;
};
export const signup = async ({ item }: { item: user }) => {
  const { data } = await userApi.post("/signup", item);
  return data;
};
export const logout = async () => {
  const { data } = await userApi.post("/logout");
  return data;
};
export const getMyProfile = async () => {
  const { data } = await userApi.get("/profile");
  return data;
};
export const updateProfile = async ({ item }: { item: user })=>{
  const {data} = await userApi.put("/profile/update",item)
  return data;
}
