"use client"
import { Button } from "@/components/ui/button";
import { Truck } from "lucide-react";
import Image from "next/image";
import React from "react";

const Page = () => {
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
                  <span className="text-sm">123456787654321</span>
                </div>
                <div className="flex flex-row gap-1">
                  <p className="text-sm">Date:</p>
                  <span className="text-sm">12/23/2025</span>
                </div>
                <div className="flex flex-row gap-1">
                  <p className="text-sm">Total:</p>
                  <span className="text-sm">500</span>
                </div>
              </div>
              <div className="order_status flex flex-col">
                <h1 className="font-bold text-base">Order Status:</h1>
                <p className="text-sm">Pending</p>
              </div>
              <div className="payment_method flex flex-col">
                <h1 className="font-bold text-base">Payment Method:</h1>
                <p className="text-sm">Razorpay Checkout</p>
              </div>
            </div>
            <div className="right flex flex-col  mr-[1rem] w-[15vw] gap-4">
              <div className="delivery_address flex flex-col">
                <h1 className="font-bold text-base">Delivery Address</h1>
                <p className="text-sm">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Explicabo, dicta.
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
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row gap-2 h-[3rem]">
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
              <div className="price">
                {" "}
                <span>500</span>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row gap-2 h-[3rem]">
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
              <div className="price">
                {" "}
                <span>500</span>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row gap-2 h-[3rem]">
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
              <div className="price">
                {" "}
                <span>500</span>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row gap-2 h-[3rem]">
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
              <div className="price">
                {" "}
                <span>500</span>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row gap-2 h-[3rem]">
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
              <div className="price">
                {" "}
                <span>500</span>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row gap-2 h-[3rem]">
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
              <div className="price">
                {" "}
                <span>500</span>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row gap-2 h-[3rem]">
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
              <div className="price">
                {" "}
                <span>500</span>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="flex flex-row w-full justify-between pt-1">
              <p className="font-bold text-[1.1rem] ">Total:</p>
              <span className="font-bold text-[1.1rem]">₹500</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
