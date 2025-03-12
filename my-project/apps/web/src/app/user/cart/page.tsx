/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Button } from "@/components/ui/button";
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
import {
  useAddOrder,
  useCreateRazorPayOrder,
  useVerifyRazorPay,
} from "@/hooks/useOrderUser";
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
import { useCart, useRemoveFromCart, useUpdateCart } from "@/hooks/useCart";
import toast from "react-hot-toast";
import { loadRazorpay } from "@/utils/razorpay";
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
  const [totalTax, setTotalTax] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentLoading, setPaymentLoading] = useState(false);

  useEffect(() => {
    setDeliveryDate(validateTime(deliveryTime, deliveryDate));
  }, [deliveryTime]);
  const { data: cart } = useCart();
  const { mutate: removeFromCart } = useRemoveFromCart();
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    removeFromCart(id);
  };
  const totalPrice = cart?.totalPrice;
  const cartItems = cart?.items;

  useEffect(() => {
    setTotalTax(parseFloat((totalPrice! * 0.05).toFixed(2)));
    setTotalDiscount(parseFloat((totalPrice! * 0.1).toFixed(2)));
    setTotalAmount(totalPrice! + totalTax - totalDiscount);
  }, [totalDiscount, totalPrice, totalTax]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeliveryDate(validateDate(e.target.value));
  };
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeliveryTime(e.target.value);
  };
  const { data: profile } = useProfile();
  const { mutateAsync: createOrder, isPending: orderCreationPending } =
    useAddOrder();
  const router = useRouter();
  const {
    mutateAsync: createRazorpayOrder,
    isPending: razorpayOrderCreationPending,
  } = useCreateRazorPayOrder();
  const { mutateAsync: verifyPayment, isPending: razorpayVerificationPending } =
    useVerifyRazorPay();
  const handleRazorpayPayment = async (amount: number) => {
    setPaymentLoading(true);
    try {
      // 1. Create Razorpay order
      const orderResponse = await createRazorpayOrder(amount);

      if (!orderResponse.success || !orderResponse.order) {
        throw new Error(
          orderResponse.message || "Failed to create payment order"
        );
      }
      const response = orderResponse.order;

      // 2. Initialize Razorpay
      await loadRazorpay();

      // 3. Open payment modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: orderResponse.order.amount,
        currency: "INR",
        name: "Pizza Shop",
        order_id: orderResponse.order.id,
        handler: async (response: any) => {
          try {
            // 4. Verify payment
            await verifyPayment({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              amount: amount,
            });

            // 5. Create order
            const result = await createOrder({
              totalPrice: amount,
              paymentMethod: "RazorPay",
              razorPayDetails: {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                amount: amount,
              },
            });

            router.push(
              `/user/orderplaced?order=${encodeURIComponent(
                JSON.stringify(result.populatedOrder)
              )}`
            );
          } catch (error) {
            toast.error("Failed to complete order");
          }
        },
        theme: { color: "#1d24e1" },
      };

      new (window as any).Razorpay(options).open();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setPaymentLoading(false);
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPayMode == "COD") {
      const result = await createOrder({
        totalPrice: totalAmount,
        deliveryTime: getISODateTime(deliveryDate, deliveryTime),
        paymentMethod: selectedPayMode,
      });

      // console.log(" Order Placed", result);
      router.push(
        `/user/orderplaced?order=${encodeURIComponent(
          JSON.stringify(result.populatedOrder)
        )}`
      );
    } else {
      await handleRazorpayPayment(totalAmount);
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
          orderCreationPending={orderCreationPending}
          razorpayOrderCreationPending={razorpayOrderCreationPending}
          razorpayVerificationPending={razorpayVerificationPending}
        />
      </div>
      <div className="right  w-[31vw]  ml-[8rem] mt-[7rem] flex flex-col gap-2 max-h-full ">
        {/*Basket */}
        <div className="flex flex-col gap-4">
          <div className="your_basket flex flex-col bg-components text-black rounded-xl p-5 gap-4">
            <div className="top flex flex-col">
              <div className="flex flex-row justify-between items-center ">
                <h1 className="text-2xl font-bold">Your Basket</h1>
                <Link href="#" onClick={() => setEditBasket(!editBasket)}>
                  <Pencil className="w-5 h-5" />
                </Link>
              </div>
              <p className="font-[540] text-sm text-black">
                {cartItems?.length} Item
              </p>
            </div>
            <div className="bottom flex flex-row justify-between">
              <div className="items flex flex-row overflow-x-auto scrollbar-hide w-[19vw] gap-3">
                {[...Array(cartItems?.length)].map((_, index) => (
                  <Image
                    key={index}
                    src={"/images/login-pizza.jpg"}
                    alt={"/images/login-pizza.jpg"}
                    width={45}
                    height={35}
                    className="rounded-xl"
                  />
                ))}
              </div>
              <div className="amount flex flex-col justify-center items-end">
                <p className="font-[540] text-[.8rem] text-black">SubTotal</p>
                <h1 className="font-bold text-xl">{totalPrice}</h1>
              </div>
            </div>
          </div>
          {/* Basket Details */}
          <div
            className={`basket_details flex flex-col bg-components text-black rounded-xl p-5 gap-4 max-h-[16rem] scrollbar-hide overflow-y-auto ${
              editBasket ? "block" : "hidden"
            }`}
          >
            {cartItems?.map((item, index) => (
              <div
                className="basket flex flex-row justify-between items-center"
                key={index}
              >
                <Image
                  src={"/images/login-pizza.jpg"}
                  alt={"/images/login-pizza.jpg"}
                  width={45}
                  height={45}
                  className="rounded-xl"
                />
                {item.items.map((ingredient, index) =>
                  ingredient.ingredients.map((item, index) => (
                    <div
                      className="flex flex-row items-center text-sm truncate "
                      key={index}
                    >
                      <p>{item.name},</p>
                    </div>
                  ))
                )}
                <div className="flex flex-row justify-end items-center gap-2">
                  <span>{item.price}</span>
                  <Button
                    variant={"ghost"}
                    onClick={(e) => handleDelete(e, item._id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Order Summary */}
        <div className="order_summary lex flex-col bg-components text-black rounded-xl p-5 gap-4 ">
          <h1 className="text-2xl font-bold mb-2">Order Summary</h1>
          <div className="flex flex-col">
            <div className="flex flex-row w-full justify-between  py-2">
              <p>SubTotal</p>
              <span>₹{totalPrice}</span>
            </div>
            <Accordion
              type="single"
              collapsible
              className="w-full pb-1 border-b"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="flex flex-row w-full justify-between ">
                    <p>Taxes*</p> <span>₹{totalTax}</span>
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
                  <div className="flex flex-row w-full justify-between ">
                    <p>Discount</p> <span>-₹{totalDiscount}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-row w-full justify-between px-2">
                    <p>
                      Coupon Code - <span>10%</span>
                    </p>
                    <span>-₹{totalDiscount}</span>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="flex flex-row w-full justify-between pt-1 ">
            <p className="font-bold text-[1.1rem] ">Total to pay</p>
            <span className="font-bold text-[1.1rem]">₹{totalAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
