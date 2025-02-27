import { createAxiosInstance } from "@/utils/axiosInstance";
import { razorPayDetails } from "@/utils/models";
export type orderItem = {
  deliveryTime?: Date;
  paymentMethod: "COD" | "RazorPay";
  razorPayDetails?: razorPayDetails;
};

export const orderApi = createAxiosInstance("/user/order");
export const addOrder = async ({ item }: { item: orderItem }) => {
  const { data } = await orderApi.post("/", item);
  return data;
};
export const getAllMyOrders = async () => {
  const { data } = await orderApi.get("/");
  return data;
};

export const cancelOrder = async (orderId: string) => {
  const { data } = await orderApi.delete(`/${orderId}`);
  return data;
};
