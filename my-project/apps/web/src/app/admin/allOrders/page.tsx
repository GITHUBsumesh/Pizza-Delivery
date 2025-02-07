"use client";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div className="w-full h-[calc(100vh-3rem)] relative overflow-x-hidden overflow-y-hidden flex flex-row center ">
      <div className="h-full w-full flex flex-row ml-[3rem]  pb-5 gap-8">
        <div className="left w-[50vw] h-screen  flex flex-col  text-[#a9a9a9] gap-4 mb-5 ">
          <div className="top flex flex-row ">
            <ArrowLeft />
            <p>Admin DashBoard</p>
          </div>
          <h1 className="font-bold text-xl">All Orders</h1>
          <div className="table_heading flex flex-row items-center justify-between text-bold text-[1.1rem]">
            <div className="flex flex-row items-center gap-5">
              <span>Order no</span>
              <span>Item</span>
            </div>
            <div className="flex flex-row items-center gap-8">
              <span>Ordered On</span>
              <span>Delivered On</span>
              <span>Price</span>
            </div>
          </div>
          <div className="orders flex flex-col p-3 gap-6 overflow-y-auto h-[77vh] scrollbar-hide">
            {[...Array(12)].map((_, index) => (
              <div
                key={index}
                className="order_item flex flex-row justify-between items-center"
              >
                <div className="flex flex-row gap-2 h-[3rem] items-center">
                  <span className="w-[4rem] \">{(index + 1) * 100}</span>
                  <div className="flex flex-row gap-2 h-full">
                    <Image
                      src={"/images/login-pizza.jpg"}
                      alt={"/images/login-pizza.jpg"}
                      width={55}
                      height={5}
                      className="rounded-xl"
                    />
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
                <div className="flex flex-row items-center gap-8">
                  <div className="delivery_on">Sep 05,2024</div>
                  <div className="price">
                    <span>500</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="right  w-[40rem] mt-[7rem] h-full flex flex-col items-center">
          <div className=" w-[35rem] max-h-[35rem]  scrollbar-hide overflow-y-auto bg-components rounded-xl gap-5">
            <div className="flex flex-col font-bold p-1">
              <h1 className="flex flex-row items-center gap-2">
                Order No : <span>123456789101</span>
              </h1>
              <h1 className="flex flex-row  gap-2 ">
                <p className="text-nowrap">Deliver To :</p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Eius, maxime?
                </p>
              </h1>
            </div>
            {[...Array(12)].map((_, index) => (
              <div
                key={index}
                className="flex flex-row justify-between items-center px-5 py-10"
              >
                <div className="flex flex-row gap-2 h-[3rem] items-center">
                  <div className="relative w-[7rem] h-[7rem] ">
                    <Image
                      src={"/images/login-pizza.jpg"}
                      alt={"/images/login-pizza.jpg"}
                      fill
                      className="rounded-xl"
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <h1 className="flex flex-row items-center gap-2">
                      Base :<span>Thin Crust</span>
                    </h1>
                    <h1 className="flex flex-row items-center gap-2">
                      Sauce :<span>Thin Crust</span>
                    </h1>
                    <h1 className="flex flex-row items-center gap-2">
                      Cheese :<span>Thin Crust</span>
                    </h1>
                    <h1 className="flex flex-row items-center gap-2">
                      Veggies :<span>Thin Crust</span>
                    </h1>
                  </div>
                </div>
                <div className="price flex flex-row items-center gap-3">
                  <span>{index}pc</span>
                  <span>500</span>
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
