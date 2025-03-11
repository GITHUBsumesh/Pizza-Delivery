"use client"
import { Button } from "@/components/ui/button";
import { Order } from "@/utils/models";
import { Truck } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { formatTimestamp } from '../../../lib/utils';

const Page = () => {
  const searchParams = useSearchParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    try {
      const orderParam = searchParams.get('order');
      
      if (orderParam) {
        const decodedOrder = decodeURIComponent(orderParam);
        const parsedOrder: Order = JSON.parse(decodedOrder);
        setOrder(parsedOrder);
      } else {
        setError('Order information not found');
      }
    } catch (err) {
      setError('Invalid order data format');
      console.error('Order parsing error:', err);
    }
  }, [searchParams]);
  if (error) {
    return <div>{error}</div>;
  }
  
  // Get the order data from query parameters
  return (
    <div className="w-full h-[calc(100vh-3rem)]  relative overflow-hidden">
      <div className="h-full w-full flex md:flex-row flex-col center-div center md:gap-4">
        <div className="left md:w-[48vw] md:h-[65vh] w-[95vw]  h-full bg-components rounded-xl flex flex-col  text-black gap-4 px-10 py-10 ">
          <div className="top flex flex-col gap-4">
            <h1 className="text-3xl font-bold">
              Thank You for Ordering with PizzaCraft!
            </h1>
            <p className="text-sm">
              Your order has been successfully placed.An email confirmation is
              on its way.
            </p>
          </div>
          <div className="middle flex flex-row justify-between mt-10">
            <div className="left flex flex-col gap-4">
              <div className="order_detail flex flex-col">
                <h1 className="font-bold text-base">Order Details:</h1>
                <div className="flex flex-row gap-1">
                  <p className="text-sm">Order No:</p>
                  <span className="text-sm">{order?._id}</span>
                </div>
                <div className="flex flex-row gap-1">
                  <p className="text-sm">Date:</p>
                  <span className="text-sm">{order?.createdAt ? formatTimestamp(order.createdAt.toString()).ddmmyyyyFormat : 'N/A'}</span>
                </div>
                <div className="flex flex-row gap-1">
                  <p className="text-sm">Total:</p>
                  <span className="text-sm">{order?.totalPrice}</span>
                </div>
              </div>
              <div className="order_status flex flex-col">
                <h1 className="font-bold text-base">Order Status:</h1>
                <p className="text-sm">{order?.status}</p>
              </div>
              <div className="payment_method flex flex-col">
                <h1 className="font-bold text-base">Payment Method:</h1>
                <p className="text-sm">{order?.payment?.method}</p>
              </div>
            </div>
            <div className="right flex flex-col  mr-[1rem] w-[15vw] gap-4">
              <div className="delivery_address flex flex-col">
                <h1 className="font-bold text-base">Delivery Address</h1>
                <p className="text-sm">
                  {order?.user?.address}
                </p>
              </div>
            </div>
          </div>
          <div className="bottom flex flex-row justify-end ">
            <div className="flex flex-col w-[16vw] items-center">
              <p className="text-[.8rem] flex flex-row items-center gap-1">
                <Truck className="w-4 h-4" />
                Est. Delivery: 5:30pm
              </p>
              <Button className="yellow w-full">Track Order</Button>
            </div>
          </div>
        </div>

        <div className="right  md:w-[30vw] md:h-[65vh] w-[95vw] h-full bg-components rounded-xl flex flex-col gap-4  p-10">
          <div className="top">
            <h1 className="text-3xl font-bold">Order Details</h1>
          </div>
          <div className="middle flex flex-col p-3 gap-6 overflow-y-auto scrollbar-hide h-[40vh] my-5">
            {order?.items?.map((order, index) => (
              <div
                key={index}
                className="order_item flex flex-row justify-between items-center"
              >
                <div className="flex flex-row gap-2 h-[3rem]">
                  <Image
                    src={"/images/login-pizza.jpg"}
                    alt={"/images/login-pizza.jpg"}
                    width={55}
                    height={5}
                    className="rounded-xl"
                  />
                  <div className="flex flex-col items-start justify-center">
                        <h1 className="font-bold">
                          {order.items[0].ingredients[0].name}
                        </h1>

                        <p className="flex flex-row text-sm ">
                          <span>{order.items[1].ingredients[0].name} , </span>
                          <span>{order.items[2].ingredients[0].name} , </span>
                          {order.items[3].ingredients.map(
                            (ingredient, index) => (
                              <span key={index}>{ingredient.name},</span>
                            )
                          )}
                        </p>
                      </div>
                </div>
                <div className="price">
                  {" "}
                  <span>{order.price}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="bottom">
            <div className="flex flex-row w-full justify-between pt-1">
              <p className="font-bold text-[1.1rem] ">Total:</p>
              <span className="font-bold text-[1.1rem]">₹{order?.totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
