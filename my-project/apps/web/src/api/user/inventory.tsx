import { createAxiosInstance } from "@/utils/axiosInstance";


export const inventoryApi = createAxiosInstance("/user/inventory");
export const getInventory = async () => {
  const { data } = await inventoryApi.get("/");
  return data;
};