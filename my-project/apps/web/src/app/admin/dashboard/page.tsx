"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div className="w-full h-[calc(100vh-3rem)]  relative overflow-hidden flex flex-row ">
      <div className="left flex flex-col w-[60rem] h-full  mt-[1rem]  items-start px-5 mx-1 gap-4">
        <div className="top  w-full h-[18rem] bg-components rounded-xl overflow-x-auto scrollbar-hide px-1 ">
          <div className="flex flex-col gap-3  w-full h-full px-5">
            <h1 className="font-bold text-xl">Being Prepared</h1>
            <hr />
            <div className="flex flex-row gap-3 overflow-x-auto scrollbar-hide">
              {[...Array(9)].map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center bg-components  text-black  rounded-xl h-[14rem] w-[20rem]"
                >
                  <h1 className="flex flex-row items-center text-[.75rem]">
                    <span className="text-nowrap">Order No : </span>
                    <span>123456789101</span>
                  </h1>
                  <div className="w-[7rem] h-[7rem] relative">
                    <Image
                      src={"/images/login-pizza.jpg"}
                      alt={"/images/login-pizza.jpg"}
                      fill
                      className="rounded-xl"
                    />
                  </div>
                  <div className="flex flex-col text-sm">
                    <h1 className="flex flex-row items-center">
                      Base : <span>Thin Crust</span>
                    </h1>
                    <h1 className="flex flex-row items-center">
                      Cheese : <span>Thin Crust</span>
                    </h1>
                    <h1 className="flex flex-row items-center">
                      Sauce : <span>Thin Crust</span>
                    </h1>
                    <h1 className="flex flex-row items-center">
                      Veggies : <span>Thin Crust</span>
                    </h1>
                  </div>
                  <div className="flex flex-row justify-between">
                    <Button>Sent To Delivery</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bottom w-full flex flex-row gap-3 ">
          <div className="left  w-[70%] h-[20rem] bg-components rounded-xl p-2">
            <h1 className="font-bold text-xl">Order History</h1>
            <hr />
            <div className="flex flex-row items-center justify-between w-full text-bold text-sm pl-1">
              <div className="flex flex-row items-center gap-5 ">
                <span>Order no</span>
                <span>Item</span>
              </div>
              <div className="flex flex-row items-center gap-9">
                <span>Ordered On</span>
                <span>Delivered On</span>
                <span>Price</span>
              </div>
            </div>
            <div className="w-full h-[16rem]  mb-2 flex flex-col gap-4 overflow-y-auto scrollbar-hide">
              {[...Array(12)].map((_, index) => (
                <div
                  key={index}
                  className="order_item flex flex-row gap-3 justify-between items-center"
                >
                  <div className="flex flex-row gap-4 h-[3rem] items-center">
                    <span className="w-[3rem]">{index + 1}*100</span>
                    <div className="flex flex-row gap-2 h-full">
                      <div className="relative w-[3.5rem] h-[3.5rem] ">
                        <Image
                          src={"/images/login-pizza.jpg"}
                          alt={"/images/login-pizza.jpg"}
                          fill
                          className="rounded-xl"
                        />
                      </div>
                      <div className="flex flex-col items-start justify-center">
                        <h1 className="font-bold">Thin Crust</h1>
                        <p className="flex flex-row text-sm">
                          <span>Large,</span>
                          <span>Pepperoni,</span>
                          <span>1 pc</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-14">
                    <div className="ordered_on">5:30 pm</div>
                    <div className="delivered_on">5:30 pm</div>
                    <div className="price">
                      <span>500</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="right  w-[30%] h-[20rem] bg-components rounded-xl p-2">
            <h1 className="font-bold text-xl">Inventory Status</h1>
            <hr />
            <div className="h-[17rem]">
              <div className="flex flex-row gap-10 w-full center text-[1.1rem]">
                <h1>Item</h1>
                <h1>Qty</h1>
              </div>

              <div className="flex flex-col h-[15rem] gap-3 overflow-y-auto scrollbar-hide">
                {[...Array(9)].map((item, index) => (
                  <div key={index} className="flex flex-row h-full gap-2 mx-auto">
                    <h1>Thin Crust : </h1>
                    <h1 className="text-red-700">19</h1>
                  </div>
                ))}
              </div>
              {/* <div className="center text-muted-foreground h-full">EveryThing In Good Stock</div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="right  w-[40rem] bg-components rounded-xl flex flex-col h-[39rem]  mt-[1rem]  items-start  mr-4 gap-4">
        <h1 className="font-bold text-2xl pl-4">Upcoming Orders</h1>
        <div className="flex flex-row items-center justify-between w-[80%] text-bold text-[1.1rem] pl-1">
          <div className="flex flex-row items-center gap-5">
            <span>Order no</span>
            <span>Item</span>
          </div>
          <div className="flex flex-row items-center gap-9">
            <span>Ordered On</span>
            <span>Price</span>
          </div>
        </div>
        <div className="w-[35rem] h-full  mx-auto px-2 mb-2 flex flex-col gap-4 overflow-y-auto scrollbar-hide">
          {[...Array(12)].map((_, index) => (
            <div
              key={index}
              className="order_item flex flex-row gap-3 justify-between items-center"
            >
              <div className="flex flex-row gap-4 h-[3rem] items-center">
                <span className="w-[2.5rem]">{index + 1}*100</span>
                <div className="flex flex-row gap-2 h-full">
                  <div className="relative w-[3.5rem] h-[3.5rem] ">
                    <Image
                      src={"/images/login-pizza.jpg"}
                      alt={"/images/login-pizza.jpg"}
                      fill
                      className="rounded-xl"
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <h1 className="font-bold">Thin Crust</h1>
                    <p className="flex flex-row text-sm">
                      <span>Large,</span>
                      <span>Pepperoni,</span>
                      <span>1 pc</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center gap-14">
                <div className="ordered_on">5:30 pm</div>
                {/* <div className="delivery_on">Sep 24</div> */}
                <div className="price">
                  <span>500</span>
                </div>
                <Button className="yellow">Start</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
