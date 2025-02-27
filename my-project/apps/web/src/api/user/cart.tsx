import { createAxiosInstance } from "@/utils/axiosInstance";
export type cartItem = {
  items: items[];
  quantity: number;
};
export type items={
  category:string;
  ingredients:string[]
}

export const cartApi = createAxiosInstance("/user/cart");

export const addToCart = async ({ item }: { item: cartItem }) => {
  const { data } = await cartApi.post("/", item);
  return data;
};
export const getCart = async () => {
  const { data } = await cartApi.get("/");
  return data;
};

export const removeFromCart = async ({itemId}:{itemId: string}) => {
  const { data } = await cartApi.delete(`/${itemId}`);
  return data;
};

export const updateCart = async ({itemId}:{itemId: string})=> {
  const { data } = await cartApi.put(`/${itemId}`);
  return data;
};
