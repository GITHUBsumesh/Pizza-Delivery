import { createAxiosInstance } from "@/utils/axiosInstance";
import {  razorPayDetails } from "@/utils/models";
export type orderItem = {
  paymentMethod: "COD" | "RazorPay" | undefined;
  _id?: string;
  totalPrice?: number;
  method?: "COD" | "RazorPay";
  razorPayDetails?: razorPayDetails;
  orderedTime?: Date;
  deliveryTime?: Date;
  createdAt?: Date;
  updatedAt?: Date;
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
export const verifyRazorpayPayment = async ({
  item,
}: {
  item: razorPayDetails;
}) => {
  const { data } = await orderApi.post("/razorpay/verify", item);
  return data;
};
export const createRazorpayOrder = async ({ amount }: { amount: number }) => {
  const { data } = await orderApi.post("/razorpay/create-order", { amount });
  return data;
};
