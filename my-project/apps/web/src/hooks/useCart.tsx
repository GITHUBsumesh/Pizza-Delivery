import {
  addToCart,
  cartItem,
  getCart,
  removeFromCart,
  updateCart,
} from "@/api/user/cart";
import { useUserStore } from "@/store/userStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useAddToCart = () => {
  const { setCart } = useUserStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cart: cartItem) => addToCart({ item: cart }),
    onSuccess: (response) => {
      if (response.success) {
        const cartData = response.cart;
        setCart(cartData);
        queryClient.setQueryData(["cart"], cartData);
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    },
  });
};
export const useRemoveFromCart = () => {
  const { setCart } = useUserStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => removeFromCart({ itemId: id }),
    onSuccess: (response) => {
      if (response.success) {
        const cartData = response.cart;
        setCart(cartData);
        queryClient.setQueryData(["cart"], cartData);
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    },
  });
};
export const useUpdateCart = () => {
  const { setCart } = useUserStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => updateCart({ itemId: id }),
    onSuccess: (response) => {
      if (response.success) {
        const cartData = response.cart;
        setCart(cartData);
        queryClient.setQueryData(["cart"], cartData);
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    },
  });
};

export const useCart = () => {
  const { setCart, cart } = useUserStore();
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      if (cart) return cart;
      const data = await getCart();
      if (data.success) {
        setCart(data.cart);
      }
      return data.cart;
    },
    staleTime: Infinity,
  });
};
