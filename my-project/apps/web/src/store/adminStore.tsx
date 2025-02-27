import { Inventory, Order } from "@/utils/models";
import { create } from "zustand";

type AdminStore = {
  inventory: Inventory[] | null;
  setInventory: (inventory: Inventory[]) => void;
  orders: Order[];
  setOrders: (orders: Order[]) => void;
};
export const useAdminStore = create<AdminStore>((set) => ({
  inventory: null,
  orders: [],
  setOrders: (orders: Order[]) => set({ orders }),
  setInventory: (inventory: Inventory[]) => set({ inventory }),
  // users: [],
  // setUsers: (users: User) => set({ users }),
}));
