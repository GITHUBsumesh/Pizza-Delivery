"use client";
import { Button } from "@/components/ui/button";
import { useInventory } from "@/hooks/useInventoryAdmin";
import { useOrder } from "@/hooks/useOrderAdmin";
import moment from "moment";
import React from "react";

const Page = () => {
  const { data: orders = [] } = useOrder();
  const { data: inventory = [] } = useInventory();

  // Get only the ingredients whose stock is < 20
  const ingredientsList = inventory.flatMap((category) =>
    category.ingredients.filter((ingredient) => ingredient.stock! < 20)
  );

  const newOrders = orders.filter((order) => order.status === "Order Received");
  const beingPrepared = orders.filter(
    (order) => order.status === "In the Kitchen"
  );
  const sentToDelivery = orders.filter(
    (order) =>
      order.status === "Sent to Delivery" || order.status === "Delivered"
  );

  return (
    <div className="w-full h-[calc(100vh-3rem)] relative overflow-hidden flex flex-row">
      <div className="left flex flex-col w-[60rem] h-full mt-[1rem] items-start px-5 mx-1 gap-4">
        <div className="top w-full h-[18rem] bg-components rounded-xl overflow-x-auto scrollbar-hide px-1">
          <div className="flex flex-col gap-3 w-full h-full p-5">
            <h1 className="font-bold text-xl">Being Prepared</h1>
            <hr />
            <div className="flex flex-row gap-3 overflow-x-auto scrollbar-hide">
              {beingPrepared.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col items-center bg-components text-black rounded-xl h-[10rem] w-[20rem] justify-between"
                >
                  <h1 className="flex flex-row items-center text-sm">
                    <span className="text-nowrap">Order No :</span>
                    <span className="text-center truncate max-w-[15ch]">
                      {item._id}
                    </span>
                  </h1>
                  <div className="flex flex-col text-sm">
                    <h1>
                      Quantity: <span>{item.items.length}</span>
                    </h1>
                    <h1>
                      Price: <span>₹{item.totalPrice}</span>
                    </h1>
                    <h1>
                      Ordered On:{" "}
                      <span>{moment(item.orderedTime).format("hh:mm A")}</span>
                    </h1>
                  </div>
                  <Button>Sent To Delivery</Button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bottom w-full flex flex-row gap-3">
          <div className="left w-[70%] h-[20rem] bg-components rounded-xl p-2">
            <h1 className="font-bold text-xl">Order History</h1>
            <hr />
            <div className="flex flex-row items-center justify-between w-full text-bold text-sm pl-1">
              <div className="flex flex-row items-center gap-5 justify-between w-full">
                <span>SL No</span>
                <span className="w-[7rem] text-center mr-9">Order No</span>
                <span>Qty</span>
                <span>Ordered On</span>
                <span>Delivered On</span>
                <span>Price</span>
              </div>
            </div>
            <div className="w-full h-[16rem] mb-2 flex flex-col gap-4 overflow-y-auto scrollbar-hide">
              {sentToDelivery.map((item, index) => (
                <div
                  key={index}
                  className="order_item flex flex-row gap-3 justify-between items-center"
                >
                  <div className="flex flex-row gap-2 h-[3rem] items-center justify-between w-full pl-2">
                    <span>{index + 1}</span>
                    <span className="w-[15rem] ml-7 text-center truncate max-w-[18ch]">
                      {item._id}
                    </span>
                    <span className="text-center">{item.items.length}</span>
                    <span className="text-center w-[5rem]">
                      {moment(item.orderedTime).format("hh:mm A")}
                    </span>
                    <span className="text-center w-[6rem]">
                      {moment(item.deliveryTime).format("hh:mm A")}
                    </span>
                    <span>₹{item.totalPrice}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="right w-[30%] h-[20rem] bg-components rounded-xl p-2">
            <h1 className="font-bold text-xl">Inventory Status</h1>
            <hr />
            <div className="h-[17rem] flex flex-col gap-3 overflow-y-auto scrollbar-hide">
              {ingredientsList.map((item, index) => (
                <div key={index} className="flex flex-row gap-2 mx-auto">
                  <h1>{item.name}</h1>
                  <h1 className="text-red-700">{item.stock}</h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="right w-[40rem] bg-components rounded-xl flex flex-col h-[39rem] mt-[1rem] items-start mr-4 gap-4">
        <h1 className="font-bold text-2xl pl-4">Upcoming Orders</h1>
        <div className="flex flex-row items-center justify-between w-[90%] text-bold text-[1.1rem] pl-2">
          <div className="flex flex-row items-center gap-5 text-sm">
            <span>SL No</span>
            <span className="w-[9rem] text-center">Order No</span>
            <span>Qty</span>
            <span className="w-[8rem] text-center">Ordered On</span>
            <span>Price</span>
          </div>
        </div>
        <div className="w-[35rem] h-full mx-auto px-2 mb-2 flex flex-col gap-4 overflow-y-auto scrollbar-hide">
          {newOrders.map((item, index) => (
            <div
              key={item._id}
              className="order_item flex flex-row gap-3 justify-between items-center"
            >
              <div className="flex flex-row gap-2 h-[3rem] items-center justify-between w-full">
                <span>{index + 1}</span>
                <span className="w-[15rem] text-center truncate max-w-[15ch]">
                  {item._id}
                </span>
                <span className="text-center">{item.items.length}</span>
                <span className="text-center w-[8rem]">
                  {moment(item.orderedTime).format("hh:mm A")}
                </span>
                <span>₹{item.totalPrice}</span>
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
