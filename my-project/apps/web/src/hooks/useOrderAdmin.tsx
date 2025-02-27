import { getAllOrders, getOrder, updateOrder } from "@/api/admin/order";
import { useAdminStore } from "@/store/adminStore";
import { Order, status } from "@/utils/models";
// import { Order } from "@/utils/models";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const useOrder = () => {
  const { orders, setOrders } = useAdminStore();
  return useQuery<Order[]>({
    queryKey: ["adminOrders"],
    queryFn: async () => {
      // Always fetch fresh data but merge with cache
      const  data  = await getAllOrders();
      const mergedOrders = [...orders, ...data.orders].filter(
        (v, i, a) => a.findIndex((t) => t._id === v._id) === i
      );
      setOrders(mergedOrders);
      console.log(mergedOrders);
      
      return mergedOrders;
    },
    initialData: [], // Force initial empty array
    //   refetchOnMount: true // Important for data freshness
    staleTime: 0,
  });
};

export const useUpdateOrder = () => {
  const { orders, setOrders } = useAdminStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: status }) =>
      updateOrder({ orderId, status }),
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["adminOrders"] });
      const previousOrders =
        queryClient.getQueryData<Order[]>(["adminOrders"]) || [];

      // Optimistic update
      const updatedOrders = previousOrders.map((order) =>
        order._id === variables.orderId
          ? { ...order, status: variables.status }
          : order
      );

      queryClient.setQueryData(["adminOrders"], updatedOrders);
      setOrders(updatedOrders);

      return { previousOrders };
    },
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message);
        // Update with actual server data
        queryClient.setQueryData<Order[]>(
          ["adminOrders"],
          (old) =>
            old?.map((order) =>
              order._id === response.updatedOrder._id
                ? response.updatedOrder
                : order
            ) || []
        );
        setOrders(
          orders.map((order) =>
            order._id === response.updatedOrder._id
              ? response.updatedOrder
              : order
          )
        );
      }
    },
    onError: (error: AxiosError, variables, context) => {
      // Rollback on error
      queryClient.setQueryData(["adminOrders"], context?.previousOrders);
      setOrders(context?.previousOrders || []);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["adminOrders"] });
    },
  });
};
export const useGetOrder = (orderId: string) => {
  return useQuery({
    queryKey: ["adminOrders", orderId],
    queryFn: async () => {
      const data = await getOrder({ orderId });
      return data.order;
    },
    enabled: !!orderId,
    staleTime: 0,
  });
};
