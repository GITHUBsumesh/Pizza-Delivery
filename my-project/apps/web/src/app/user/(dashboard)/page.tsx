"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="w-full h-[calc(100vh-3rem)]  relative overflow-hidden">
      <div className="h-full w-full flex flex-col md:gap-4 text-white justify-between">
        <div className="top w-full flex flex-col items-start  justify-center gap-5 h-[40vh] mx-5">
          <h1 className="font-bold text-8xl">Make Your Dream Pizza</h1>
          <Link href={"/user/customize"}>
            <Button className="yellow">Start From Scratch</Button>
          </Link>
        </div>
        <div className="bottom flex flex-col w-full items-start mx-5 mb-10 gap-4">
          <h1 className="font-bold text-3xl">Customize Existing Pizza</h1>

          <div className="flex flex-row overflow-x-auto scrollbar-hide w-full gap-6 ">
            {[...Array(9)].map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-components text-black  rounded-xl h-[30vh] w-[20vw]"
              >
                <div className="w-[20vw] h-[25vh] relative">
                  <Image
                    src={"/images/login-pizza.jpg"}
                    alt={"/images/login-pizza.jpg"}
                    fill
                    className="rounded-xl"
                  />
                </div>
                <h1 className="font-bold">Margarita,Extra Cheese</h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
