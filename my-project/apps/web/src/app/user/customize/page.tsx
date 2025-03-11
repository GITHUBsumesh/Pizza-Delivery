/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Combobox, TypeData } from "@/components/User/ComboBoxPopover";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import StructuredInventory from "@/components/structuredInventory";
import { useAddToCart } from "@/hooks/useCart";
import { items } from "@/api/user/cart";

const Page = () => {
  const base = StructuredInventory({ item: "Base" });
  const veggies = StructuredInventory({ item: "Veggies" });
  const sauce = StructuredInventory({ item: "Sauce" });
  const cheese = StructuredInventory({ item: "Cheese" });
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

  const [subTotalAmount, setSubTotalAmount] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [totalDiscount] = useState(100); // Fixed Discount
  const [totalAmount, setTotalAmount] = useState(0);

  const router = useRouter();
  const { mutate } = useAddToCart();
  const addToCart = (e: React.FormEvent) => {
    e.preventDefault();
    const items: items[] = [];
    [baseValue, sauceValue, cheeseValue].forEach((item) => {
      if (item) items.push({ category: item.category as string, ingredients: [item._id] });
    });

    if (veggieValue!.length > 0) {
      items.push({
        category: veggieValue![0].category!,
        ingredients: veggieValue!.map((veggie) => veggie._id),
      });
    }

    mutate(
      {
        items,
        quantity: 1,
      },
      {
        onSuccess: () => {
          router.push("/user/cart");
        },
      },
    );
  };
  useEffect(() => {
    // Convert price string (₹250.00) to number
    const parsePrice = (price: string | number | undefined) => {
      if (typeof price === "number") return price;
      return price ? Number(price.replace(/₹|,/g, "")) : 0;
    };
    const totalPrice =
      veggieValue?.reduce((acc, item) => {
        const price = parseFloat(String(item.price).replace(/[^\d.]/g, ""));
        return acc + (isNaN(price) ? 0 : price);
      }, 0) ?? 0;

    const subtotal =
      parsePrice(baseValue?.price) +
      parsePrice(cheeseValue?.price) +
      parsePrice(sauceValue?.price) +
      +totalPrice;

    setSubTotalAmount(subtotal);

    const tax = (subtotal * 5) / 100;
    setTotalTax(tax);

    const total = subtotal + tax - totalDiscount;
    setTotalAmount(total);
  }, [baseValue, cheeseValue, sauceValue, veggieValue]);

  return (
    <div className="w-full h-[calc(100vh-3rem)] relative overflow-hidden">
      <div className="sm:w-[70vw] h-[90vh] w-[95vw] bg-components rounded-[3rem] center-div flex md:flex-row flex-col transition-transform duration-300 center">
        {/* Left Section */}
        <div className="left md:w-[35vw] md:h-full h-[10vh] center w-full flex-col flex-1">
          <div className="top  relative w-[15rem] h-[15rem] md:w-[45vh] md:h-[45vh]">
            <Image
              src={`/images/home-pizza.jpg`}
              alt="Pizza Image"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="right md:w-[35vw] w-full flex flex-col md:flex-1  p-0 center ">
          <h1 className="md:text-[2rem] text-[2rem] font-bold md:pb-10 pb-2 text-[#d6d50c] flex md:flex-col flex-row gap-1 justify-start  w-full pl-4">
            <span className="md:text-[2.8rem]"> Create </span>{" "}
            <span> Your Perfect Pizza</span>
          </h1>
          <div className="flex flex-col justify-between md:w-[30vw] w-full  md:h-[50vh] h-[45vh] gap-2 md:pl-2 px-6">
            <div className="flex flex-col justify-start gap-5">
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
            </div>
            {/* Pricing Details */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-row w-full justify-between px-2 ">
                <p>SubTotal</p>
                <span>₹{subTotalAmount.toFixed(2)}</span>
              </div>
              <div className="flex flex-row justify-end md:pb-0 pb-5">
                <Button className="yellow" onClick={addToCart}>
                  Add to Cart
                </Button>
              </div>
            </div>

            {/* <Accordion type="single" collapsible className="w-full px-2">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="flex flex-row w-full justify-between px-2">
                    <p>Taxes*</p> <span>₹{totalTax.toFixed(2)}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-row w-full justify-between px-2">
                    <p>CGST-2.5%</p>
                    <span>₹{(totalTax / 2).toFixed(2)}</span>
                  </div>
                  <div className="flex flex-row w-full justify-between px-2">
                    <p>SGST-2.5%</p>
                    <span>₹{(totalTax / 2).toFixed(2)}</span>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-green-800">
                  <div className="flex flex-row w-full justify-between px-2">
                    <p>Discount</p> <span>-₹{totalDiscount.toFixed(2)}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-row w-full justify-between px-2">
                    <p>
                      Coupon Code - <span>FIRST</span>
                    </p>
                    <span>-₹500.00</span>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>


            <div className="flex flex-row w-full justify-between px-2">
              <p>Total</p>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
