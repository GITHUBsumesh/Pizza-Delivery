"use client";
import { useOrders } from "@/hooks/useOrderUser";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = () => {
  const { data: orderData } = useOrders();
  return (
    <div className="w-full h-[calc(100vh-3rem)] relative overflow-x-hidden overflow-y-hidden flex flex-row center ">
      <div className="h-full w-full flex flex-col items-center py-5">
        <div className=" w-[50vw] h-screen  flex flex-col  text-[#a9a9a9] gap-4 mb-5">
          <Link href={"/user"}>
            <div className="top flex flex-row">
              <ArrowLeft />
              <p>Back To Home</p>
            </div>
          </Link>
          <h1 className="font-bold text-xl">My Orders</h1>
          <div className="flex flex-row items-center justify-between text-bold text-[1.1rem]">
            <div className="flex flex-row items-center gap-5">
              <span>Sl no</span>
              <span>Item</span>
            </div>
            <div className="flex flex-row items-center gap-8">
              <span>Delivered On</span>
              <span>Price</span>
            </div>
          </div>
          <div className="orders flex flex-col p-3 gap-6 overflow-y-auto h-[70vh] scrollbar-hide">
            {orderData?.map((item, index) => (
              <div
                key={index}
                className="order_item flex flex-row justify-between items-center"
              >
                <div className="flex flex-row gap-2 h-[3rem] items-center">
                  <span className="w-[2rem]">{index + 1}</span>
                  {item.items?.map((order, index) => (
                    <div className="flex flex-row gap-2 h-full " key={index}>
                      <div className="relative w-[3.5rem] h-[3.5rem] ">
                        <Image
                          src={"/images/login-pizza.jpg"}
                          alt={"/images/login-pizza.jpg"}
                          fill
                          className="rounded-xl"
                        />
                      </div>

                      <div className="flex flex-col items-start justify-center">
                        <h1 className="font-bold">
                          {order.items[0].ingredients[0].name}
                        </h1>

                        <p className="flex flex-row text-sm ">
                          <span>{order.items[1].ingredients[0].name} , </span>
                          <span>{order.items[2].ingredients[0].name} , </span>
                          {order.items[3]?.ingredients?.map(
                            (ingredient, index) => (
                              <span key={index}>{ingredient.name},</span>
                            )
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-row items-center gap-8">
                  <div className="delivery_on">
                    {item.status == "Delivered"
                      ? item.deliveryTime!.toLocaleDateString()
                      : item.status}
                  </div>
                  <div className="price">
                    <span>{item.totalPrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
