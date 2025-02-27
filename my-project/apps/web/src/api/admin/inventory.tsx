import { createAxiosInstance } from "@/utils/axiosInstance";
const inventoryApi = createAxiosInstance("/admin/inventory");

export type inventoryItem = {
  categoryName?: string;
  name: string;
  stock: number;
  price: number;
  image?: string;
};
type categoryItem = {
  name: string;
  selectionType: "single" | "multiple";
};
// get full inventory
export const getInventory = async () => {
  const { data } = await inventoryApi.get("/");
  return data;
};

// inventory items
export const getInventoryItem = async (ingredientId: string) => {
  const { data } = await inventoryApi.get(`/${ingredientId}`);
  return data;
};
export const updateInventoryItem = async ({
  ingredientId,
  item,
}: {
  ingredientId: string;
  item: inventoryItem;
}) => {
  const { data } = await inventoryApi.put(`/${ingredientId}`, item);
  return data;
};
export const deleteInventoryItem = async (ingredientId: string) => {
  const { data } = await inventoryApi.delete(`/${ingredientId}`);
  return data;
};
export const addInventory = async ({ item }: { item: inventoryItem }) => {
  const { data } = await inventoryApi.post("/add", item);
  return data;
};

// category
export const createCategory = async ({ item }: { item: categoryItem }) => {
  const { data } = await inventoryApi.post("/category", item);
  return data;
};
export const updateCategory = async ({
  categoryId,
  item,
}: {
  categoryId: string;
  item: categoryItem;
}) => {
  const { data } = await inventoryApi.put(`/category/${categoryId}`, item);
  return data;
};
export const deleteCategory = async ({
  categoryId,
}: {
  categoryId: string;
}) => {
  const { data } = await inventoryApi.delete(`/category/${categoryId}`);
  return data;
};

// all ingredients
export const softDeleteAllIngredientsInCategory = async ({
  inventoryId,
}: {
  inventoryId: string;
}) => {
  const { data } = await inventoryApi.delete(
    `/category/${inventoryId}/softDelete`
  );
  return data;
};
export const restoreAllIngredientsInCategory = async ({
  inventoryId,
}: {
  inventoryId: string;
}) => {
  const { data } = await inventoryApi.delete(
    `/category/${inventoryId}/restoreDelete`
  );
  return data;
};
