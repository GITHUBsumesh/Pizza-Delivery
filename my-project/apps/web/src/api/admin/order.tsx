import { createAxiosInstance } from "@/utils/axiosInstance";
import { status } from "@/utils/models";
const orderApi = createAxiosInstance("/admin/orders");

export const getAllOrders = async () => {
  const { data } = await orderApi.get("/");
  return data;
};
export const getOrder = async ({ orderId }: { orderId: string }) => {
  const { data } = await orderApi.get(`/${orderId}`);
  return data;
};
export const updateOrder = async ({
  orderId,
  status,
}: {
  orderId: string;
  status: status;
}) => {
  const { data } = await orderApi.put(`/${orderId}`, {status});
  return data;
};
