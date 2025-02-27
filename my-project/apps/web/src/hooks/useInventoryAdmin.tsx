import {
  addInventory,
  deleteInventoryItem,
  getInventory,
  inventoryItem,
  updateInventoryItem,
} from "@/api/admin/inventory";
import { useAdminStore } from "@/store/adminStore";
import { Inventory } from "@/utils/models";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const useInventory = () => {
  const { inventory, setInventory } = useAdminStore();
  return useQuery<Inventory[]>({
    queryKey: ["adminInventory"],
    queryFn: async () => {
      if (inventory) return inventory;
      const data = await getInventory();
      if (data.success) {
        setInventory(data.inventory);
      }
      return data.inventory;
    },
    staleTime: 0,
  });
};
export const useUpdateInventory = () => {
  const { setInventory } = useAdminStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      ingredientId,
      item,
    }: {
      ingredientId: string;
      item: inventoryItem;
    }) => updateInventoryItem({ item, ingredientId }),
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message);
        const inventoryData = response.inventory;
        setInventory(inventoryData);
        // queryClient.setQueryData(["adminInventory"], inventoryData);
        queryClient.invalidateQueries({ queryKey: ["adminInventory"] });
      } else {
        toast.error(response.message);
      }
    },
    onError: (error: AxiosError) => {
      // Handle error properly
      const errorMessage =
        (error.response?.data as { message: string })?.message ||
        "Cannot update item";
      toast.error(errorMessage);
    },
  });
};
export const useAddInventory = () => {
  const { setInventory } = useAdminStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (item: inventoryItem) => addInventory({ item: item }),
    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey: ["adminInventory"] });

      const previousInventory = queryClient.getQueryData<Inventory[]>([
        "adminInventory",
      ]);
      // Optimistically update Zustand store
      setInventory([...previousInventory, newItem]); // ✅ Correct
      return { previousInventory };
    },
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message);
        setInventory(response.inventory); // Set full updated inventory from backend
        queryClient.setQueryData(["adminInventory"], response.inventory);
      } else {
        toast.error(response.message);
      }
    },
    onError: (error: AxiosError, _, context) => {
      toast.error(
        (error.response?.data as { message: string })?.message ||
          "Cannot add item"
      );

      // Rollback on failure
      if (context?.previousInventory) {
        setInventory(context.previousInventory);
        queryClient.setQueryData(["adminInventory"], context.previousInventory);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["adminInventory"] });
    },
  });
};
export const useDeleteInventory = () => {
  const { setInventory } = useAdminStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (itemId: string) => deleteInventoryItem(itemId),
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message);
        const inventoryData = response.inventory;
        setInventory(inventoryData);
        queryClient.setQueryData(["adminInventory"], inventoryData);
      } else {
        toast.error(response.message);
      }
    },
    onError: (error: AxiosError) => {
      // Handle error properly
      const errorMessage =
        (error.response?.data as { message: string })?.message ||
        "Cannot delete item";
      toast.error(errorMessage);
    },
  });
};
