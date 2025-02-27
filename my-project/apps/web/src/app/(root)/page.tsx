
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Lock, Pizza } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className=" h-screen w-screen center-div center flex-row bg-smallScreen-home md:bg-none bg-cover bg-center">
      <div className="left flex flex-col md:w-[50vw] md:pl-[5rem] pl-5 text-white w-screen ">
        <h1 className="flex flex-row items-center gap-2 pb-2">
          <span className="yellow w-10 h-7 center flex-row">
            <Pizza className="rotate-90 w-4 h-4" />
          </span>
          PizzaCraft
        </h1>
        <h1 className="text-[3rem] font-bold mt-4">Customize Your Pizza</h1>
        <div className="flex flex-col mb-10 mt-4">
          <p className="">Explore our menu,create your perfect pizza, and </p>
          <p className=""> enjoy a seamless ordering experience</p>
        </div>
        <div className="flex flex-col justify-center">
          <Link href={"/auth/user/login"}>
            <InteractiveHoverButton className="yellow w-[10rem] border-none">
              Customize
            </InteractiveHoverButton>
          </Link>
          <Link href={"/auth/admin/login"}>
            <p className="flex flex-row items-center text-[.625rem] pt-2 pl-1 text-blue-600 gap-0.5">
              Admin <Lock className="w-3 h-3 pb-0.5" />
            </p>
          </Link>
        </div>
      </div>
      <div className="right md:flex w-[50vw] relative justify-end items-center h-full hidden">
        <Image
          src="/images/home-pizza.jpg"
          alt="home pizza"
          fill
          // sizes=""
          className=""
          // priority
        />
      </div>
    </div>
  );
};

export default Page;
