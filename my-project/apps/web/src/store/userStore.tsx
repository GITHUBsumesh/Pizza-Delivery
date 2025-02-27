import { Cart, Inventory, Order, razorPayDetails } from "@/utils/models";
import { create } from "zustand";

type UserStore = {
  cart: Cart;
  setCart: (cart: Cart) => void;
  inventory: Inventory[] | null;
  setInventory: (inventory: Inventory[]) => void;
  orders: Order;
  setOrders: (orders: Order) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  cart: {
    _id: "",
    user: "",
    items: [],
    totalPrice: 0,
  }, // Initialize with empty items array
  inventory: null,
  orders: {
    _id: "",
    user: "",
    items: [],
    totalPrice: 0,
    status: "Order Received",
    payment: { method: "COD", razorPayDetails: {} as razorPayDetails },
    orderedTime: new Date(),
    deliveryTime: new Date(),
  },
  setOrders: (orders: Order) => set({ orders }),
  setCart: (cart: Cart) => set({ cart }),
  setInventory: (inventory: Inventory[]) => set({ inventory }),
}));
