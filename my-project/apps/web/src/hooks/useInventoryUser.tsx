import { getInventory } from "@/api/user/inventory";
import { useUserStore } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";

export const useInventory = () => {
  const { inventory, setInventory } = useUserStore();
  return useQuery({
    queryKey: ["userInventory"],
    queryFn: async () => {
      if (inventory) return inventory;
      const data = await getInventory();
      if (data.success) {
        setInventory(data.inventory);
      }
      return data.inventory;
    },
    staleTime: 30 * 60 * 1000,
  });
};
