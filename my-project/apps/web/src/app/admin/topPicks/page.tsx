"use client";
import { Combobox, TypeData } from "@/components/User/ComboBoxPopover";
import Image from "next/image";
import React, { useState } from "react";
import { base, veggies, sauce, cheese } from "@/data/data.json";
import { Button } from "@/components/ui/button";
const Page = () => {
   const [baseValue, setBaseValue] = useState<TypeData | null | undefined>(null);
    const [cheeseValue, setCheeseValue] = useState<TypeData | null | undefined>(
      null
    );
    const [sauceValue, setSauceValue] = useState<TypeData | null | undefined>(
      null
    );
    const [veggieValue, setVeggieValue] = useState<TypeData[] | null | undefined>(
      null
    );

  return (
    <div className="w-full h-[calc(100vh-3rem)]  relative overflow-hidden flex flex-col ">
      <div className="top flex flex-row w-full overflow-x-auto scrollbar-hide  mt-[1rem]  items-start px-5 mx-1 gap-4">
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
            <h1 className="font-bold">{index}Margarita,Extra Cheese</h1>
          </div>
        ))}
      </div>
      <div className="bottom w-[45rem] h-[25rem] m-7 bg-components rounded-xl flex flex-row  ">
        <div className="left flex-row center flex-1">
          <div className="relative w-[17rem] h-[17rem] ">
            <Image
              src={"/images/login-pizza.jpg"}
              alt={"/images/login-pizza.jpg"}
              fill
              className="rounded-xl"
            />
          </div>
        </div>
        <div className="right flex-col flex-1 flex items-start justify-center text-xl gap-3 mr-4">
        <Combobox
                title="Base"
                data={base}
                value={baseValue}
                setValue={setBaseValue}
              />
              <Combobox
                title="Sauce"
                data={sauce}
                value={sauceValue}
                setValue={setSauceValue}
              />
              <Combobox
                title="Cheese"
                data={cheese}
                value={cheeseValue}
                setValue={setCheeseValue}
              />
              <Combobox
                title="Veggies"
                data={veggies}
                multipleValue={veggieValue}
                setMultipleValue={setVeggieValue}
                multiple={true}
              />
          <div className="bottom flex flex-row justify-between w-full gap-2">
          <Button className="yellow">Delete</Button>
            <div className="flex flex-row items-center gap-2">
              <Button className="yellow">Add New</Button>
            <Button className="yellow">Update</Button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
