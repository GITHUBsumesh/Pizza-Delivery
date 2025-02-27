/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import CustomCheckbox from "@/components/Buttons/RadioButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Pencil, Plus, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { useProfile } from "@/hooks/useAuth";
import { useAddOrder } from "@/hooks/useOrderUser";
import {
  currentDate,
  currentTime,
  getISODateTime,
  resetDeliveryTime,
  validateDate,
  validateTime,
} from "@/utils/deliveryTimeUtils";
import { useRouter } from "next/navigation";
import CheckoutForm from "@/components/Form/CheckoutForm";
const Page = () => {
  // const [email, setEmail] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [address, setAddress] = useState("");
  // const [deliveryInstructions, setDeliveryInstructions] = useState("");
  // const [addAddress, setAddAddress] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState<"asap" | "later">("asap");
  const [selectedPayMode, setSelectedPayMode] = useState<"COD" | "RazorPay">(
    "COD"
  );

  const [editBasket, setEditBasket] = useState<boolean>(false);
  const [deliveryDate, setDeliveryDate] = useState<string>(currentDate);
  const [deliveryTime, setDeliveryTime] = useState<string>(currentTime);

  useEffect(() => {
    setDeliveryDate(validateTime(deliveryTime, deliveryDate));
  }, [deliveryTime]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeliveryDate(validateDate(e.target.value));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeliveryTime(e.target.value);
  };

  const { data: profile } = useProfile();
  const { mutate } = useAddOrder();
  const router = useRouter();
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPayMode == "COD") {
      mutate(
        {
          deliveryTime: getISODateTime(deliveryDate, deliveryTime),
          paymentMethod: selectedPayMode,
        },
        {
          onSuccess: () => {
            router.push("/user/orderplaced");
          },
        }
      );
    }
  };
  return (
    <div className="w-full h-[calc(100vh-3rem)] relative overflow-x-hidden overflow-y-auto flex flex-row ">
      <div className="left w-[47vw] h-full ml-[7rem] mt-[2rem] flex flex-col  text-[#a9a9a9] gap-2">
        <Link href={"/user"}>
          <div className="top flex flex-row">
            <ArrowLeft />
            <p>Back To Home</p>
          </div>
        </Link>
        <h1 className="font-bold text-[1.6rem]">Checkout</h1>
        <hr />
        <div className="saved_address flex flex-col ">
          <div className="flex flex-row justify-between items-center">
            <h1>Delivery To</h1>
          </div>
          <h1>
            {profile.firstName} {profile.lastName}
          </h1>
          <h1 className="flex flex-row items-center">
            Phone No : <span>{profile.phoneNumber}</span>
          </h1>
          <h1 className="flex flex-row items-center">
            Email Address : <span>{profile.email}</span>
          </h1>
          <h1 className="flex flex-row items-center">
            Address :
            <span>
              {"   "}
              {profile.address}
            </span>
          </h1>
        </div>
        <CheckoutForm
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          deliveryTime={deliveryTime}
          setDeliveryTime={setDeliveryTime}
          deliveryDate={deliveryDate}
          setDeliveryDate={setDeliveryDate}
          selectedPayMode={selectedPayMode}
          setSelectedPayMode={setSelectedPayMode}
          handlePlaceOrder={handlePlaceOrder}
          resetDeliveryTime={resetDeliveryTime}
          handleDateChange={handleDateChange}
          handleTimeChange={handleTimeChange}
        />
      </div>
      <div className="right  w-[31vw]  ml-[8rem] mt-[7rem] flex flex-col gap-2 max-h-full ">
        <div className="flex flex-col gap-4">
          <div className="your_basket flex flex-col bg-components text-black rounded-xl p-5 gap-4">
            <div className="top flex flex-col">
              <div className="flex flex-row justify-between items-center ">
                <h1 className="text-2xl font-bold">Your Basket</h1>
                <Link href="#" onClick={() => setEditBasket(!editBasket)}>
                  <Pencil className="w-5 h-5" />
                </Link>
              </div>
              <p className="font-[540] text-sm text-black"> 1 Item</p>
            </div>
            <div className="bottom flex flex-row justify-between">
              <div className="items flex flex-row overflow-x-auto scrollbar-hide w-[19vw] gap-3">
                <Image
                  src={"/images/login-pizza.jpg"}
                  alt={"/images/login-pizza.jpg"}
                  width={45}
                  height={35}
                  className="rounded-xl"
                />
                <Image
                  src={"/images/login-pizza.jpg"}
                  alt={"/images/login-pizza.jpg"}
                  width={45}
                  height={35}
                  className="rounded-xl"
                />
                <Image
                  src={"/images/login-pizza.jpg"}
                  alt={"/images/login-pizza.jpg"}
                  width={45}
                  height={35}
                  className="rounded-xl"
                />
                <Image
                  src={"/images/login-pizza.jpg"}
                  alt={"/images/login-pizza.jpg"}
                  width={45}
                  height={35}
                  className="rounded-xl"
                />
                <Image
                  src={"/images/login-pizza.jpg"}
                  alt={"/images/login-pizza.jpg"}
                  width={45}
                  height={35}
                  className="rounded-xl"
                />
                <Image
                  src={"/images/login-pizza.jpg"}
                  alt={"/images/login-pizza.jpg"}
                  width={45}
                  height={35}
                  className="rounded-xl"
                />
                <Image
                  src={"/images/login-pizza.jpg"}
                  alt={"/images/login-pizza.jpg"}
                  width={45}
                  height={35}
                  className="rounded-xl"
                />
                <Image
                  src={"/images/login-pizza.jpg"}
                  alt={"/images/login-pizza.jpg"}
                  width={45}
                  height={35}
                  className="rounded-xl"
                />
                <Image
                  src={"/images/login-pizza.jpg"}
                  alt={"/images/login-pizza.jpg"}
                  width={45}
                  height={35}
                  className="rounded-xl"
                />
                <Image
                  src={"/images/login-pizza.jpg"}
                  alt={"/images/login-pizza.jpg"}
                  width={45}
                  height={35}
                  className="rounded-xl"
                />
              </div>
              <div className="amount flex flex-col justify-center items-end">
                <p className="font-[540] text-[.8rem] text-black">SubTotal</p>
                <h1 className="font-bold text-xl">500</h1>
              </div>
            </div>
          </div>
          <div
            className={`basket_details flex flex-col bg-components text-black rounded-xl p-5 gap-4 max-h-[16rem] scrollbar-hide overflow-y-auto ${
              editBasket ? "block" : "hidden"
            }`}
          >
            <div className="basket flex flex-row justify-between items-center">
              <Image
                src={"/images/login-pizza.jpg"}
                alt={"/images/login-pizza.jpg"}
                width={45}
                height={45}
                className="rounded-xl"
              />
              <div className="flex flex-row justify-end items-center gap-2">
                <span>500</span>
                <X className="w-4 h-4" />
              </div>
            </div>
            <div className="basket flex flex-row justify-between items-center">
              <Image
                src={"/images/login-pizza.jpg"}
                alt={"/images/login-pizza.jpg"}
                width={45}
                height={65}
                className="rounded-xl"
              />
              <div className="flex flex-row justify-end items-center gap-2">
                <span>500</span>
                <X className="w-4 h-4" />
              </div>
            </div>
            <div className="basket flex flex-row justify-between items-center">
              <Image
                src={"/images/login-pizza.jpg"}
                alt={"/images/login-pizza.jpg"}
                width={45}
                height={65}
                className="rounded-xl"
              />
              <div className="flex flex-row justify-end items-center gap-2">
                <span>500</span>
                <X className="w-4 h-4" />
              </div>
            </div>
            <div className="basket flex flex-row justify-between items-center">
              <Image
                src={"/images/login-pizza.jpg"}
                alt={"/images/login-pizza.jpg"}
                width={45}
                height={65}
                className="rounded-xl"
              />
              <div className="flex flex-row justify-end items-center gap-2">
                <span>500</span>
                <X className="w-4 h-4" />
              </div>
            </div>
            <div className="basket flex flex-row justify-between items-center">
              <Image
                src={"/images/login-pizza.jpg"}
                alt={"/images/login-pizza.jpg"}
                width={45}
                height={65}
                className="rounded-xl"
              />
              <div className="flex flex-row justify-end items-center gap-2">
                <span>500</span>
                <X className="w-4 h-4" />
              </div>
            </div>
            <div className="basket flex flex-row justify-between items-center">
              <Image
                src={"/images/login-pizza.jpg"}
                alt={"/images/login-pizza.jpg"}
                width={45}
                height={65}
                className="rounded-xl"
              />
              <div className="flex flex-row justify-end items-center gap-2">
                <span>500</span>
                <X className="w-4 h-4" />
              </div>
            </div>
            <div className="basket flex flex-row justify-between items-center">
              <Image
                src={"/images/login-pizza.jpg"}
                alt={"/images/login-pizza.jpg"}
                width={45}
                height={65}
                className="rounded-xl"
              />
              <div className="flex flex-row justify-end items-center gap-2">
                <span>500</span>
                <X className="w-4 h-4" />
              </div>
            </div>
            <div className="basket flex flex-row justify-between items-center">
              <Image
                src={"/images/login-pizza.jpg"}
                alt={"/images/login-pizza.jpg"}
                width={45}
                height={65}
                className="rounded-xl"
              />
              <div className="flex flex-row justify-end items-center gap-2">
                <span>500</span>
                <X className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
        <div className="order_summary lex flex-col bg-components text-black rounded-xl p-5 gap-4 ">
          <h1 className="text-2xl font-bold mb-2">Order Summary</h1>
          <div className="flex flex-col">
            <div className="flex flex-row w-full justify-between  py-2">
              <p>SubTotal</p>
              <span>₹{2}</span>
            </div>
            <Accordion
              type="single"
              collapsible
              className="w-full pb-1 border-b"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="flex flex-row w-full justify-between ">
                    <p>Taxes*</p> <span>₹{2}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-row w-full justify-between px-2">
                    <p>CGST-2.5%</p>
                    <span>₹{(2).toFixed(2)}</span>
                  </div>
                  <div className="flex flex-row w-full justify-between px-2">
                    <p>SGST-2.5%</p>
                    <span>₹{(2).toFixed(2)}</span>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-green-800">
                  <div className="flex flex-row w-full justify-between ">
                    <p>Discount</p> <span>-₹{2}</span>
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
          </div>
          <div className="flex flex-row w-full justify-between pt-1 ">
            <p className="font-bold text-[1.1rem] ">Total to pay</p>
            <span className="font-bold text-[1.1rem]">₹500</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
