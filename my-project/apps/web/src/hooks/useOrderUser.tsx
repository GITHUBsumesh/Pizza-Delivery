import { addOrder, cancelOrder, createRazorpayOrder, getAllMyOrders, orderItem, verifyRazorpayPayment } from '@/api/user/order';
import { useUserStore } from '@/store/userStore';
import { Order, razorPayDetails } from '@/utils/models';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';


export const useAddOrder = () => {
    const {setOrders} = useUserStore()
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: (orderItem : orderItem)=>addOrder({item:orderItem}),
      
      onSuccess:(response)=>{
        if(response.success){
          const orderData=response.orders;
          setOrders(orderData);
          queryClient.setQueryData(["UserOrders"],orderData);
          toast.success(response.message);
        }
        else {
          toast.error(response.message);
        }
      },
      onError: (error: AxiosError) => {
        // Handle error properly
        const errorMessage =
          (error.response?.data as { message: string })?.message ||
          "Cannot place order";
        toast.error(errorMessage);
      },
    })
  };

  export const useCancelOrder = () => {
    const {setOrders} = useUserStore()
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: (orderId : string)=>cancelOrder(orderId),
      onSuccess:(response)=>{
        if(response.success){
          const orderData=response.orders;
          setOrders(orderData);
          queryClient.setQueryData(["UserOrders"],orderData);
          toast.success(response.message);
        }
        else {
          toast.error(response.message);
        }
      }
    })
  };

export const useOrders = () => {
  const { setOrders } = useUserStore();
  return useQuery<Order[]>({
    queryKey: ["UserOrders"],
    queryFn: async () => {
      const data = await getAllMyOrders();
      if (data.success) {
        setOrders(data.orders);
      }
      return data.orders;
    },
    staleTime: Infinity,
  });
};

  
export const useVerifyRazorPay=()=>{
    return useMutation({
      mutationFn: (razorpay : razorPayDetails)=>verifyRazorpayPayment({item : razorpay}),
      onSuccess:(response)=>{
        if(response.success){
          toast.success(response.message);
        }
        else {
          toast.error(response.message);
        }
      }
    })
}
export const useCreateRazorPayOrder=()=>{
    return useMutation({
      mutationFn: (amount : number)=>createRazorpayOrder({amount}),
      onSuccess:(response)=>{
        if(response.success){
          toast.success(response.message);
        }
        else {
          toast.error(response.message);
        }
      },
      onError: (error: AxiosError) => {
        toast.error(error.message || "Failed to create payment order");
      }
    })
}