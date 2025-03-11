/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Button } from "@/components/ui/button";
import { useGetOrder, useOrder, useUpdateOrder } from "@/hooks/useOrderAdmin";
import { Item, Order, status } from "@/utils/models";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import moment from "moment";

const Page = () => {
  const { data: orders = [] } = useOrder();
  console.log("orders ", orders);

  const { mutate: updateOrder } = useUpdateOrder();
  const statusOptions: status[] = [
    "Order Received",
    "In the Kitchen",
    "Sent to Delivery",
    "Delivered",
  ];
  const orderArray = Array.isArray(orders) ? orders : [];
  const [order, setOrder] = useState<Order | null>(null);
  const [orderStatus, setOrderStatus] = useState<status>("Order Received");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const { data: orderItem } = useGetOrder(selectedOrderId || "");

  useEffect(() => {
    if (orderItem) {
      setOrder(orderItem);
      setOrderStatus(orderItem.status);
    }
  }, [orderItem]);

  const handleUpdateOrder = () => {
    // e.preventDefault();
    if (selectedOrderId && orderStatus) {
      updateOrder({
        orderId: selectedOrderId,
        status: orderStatus,
      });
    }
  };
  // Filtering State
  const [filter, setFilter] = useState({
    status: "",
    dateSort: "newest", // Newest or Oldest
    sortBy: "price", // Price or Quantity
    order: "high", // High to Low or Low to High
  });
  const filteredOrders = [...orderArray]
    .filter((order) => (filter.status ? order.status === filter.status : true))
    .sort((a, b) => {
      // Step 1: Sort by Date (Newest or Oldest)
      const dateA = new Date(a.orderedTime ?? 0).getTime();
      const dateB = new Date(b.orderedTime ?? 0).getTime();

      if (filter.dateSort === "newest") {
        if (dateB !== dateA) return dateB - dateA;
      } else if (filter.dateSort === "oldest") {
        if (dateA !== dateB) return dateA - dateB;
      }

      // Step 2: Sort by Price or Quantity
      const valueA =
        filter.sortBy === "price" ? a.totalPrice ?? 0 : a.items?.length ?? 0;
      const valueB =
        filter.sortBy === "price" ? b.totalPrice ?? 0 : b.items?.length ?? 0;

      // Step 3: Apply High to Low or Low to High Sorting
      return filter.order === "high" ? valueB - valueA : valueA - valueB;
    });

  return (
    <div className="w-full h-[calc(100vh-3rem)] relative overflow-x-hidden overflow-y-hidden flex flex-row center">
      <div className="h-full w-full flex flex-row ml-[3rem] pb-5 gap-8">
        {/* Left Side - Orders List */}
        <div className="left w-[50vw] h-screen flex flex-col text-[#a9a9a9] gap-4 mb-5">
          <div className="top flex flex-row">
            <ArrowLeft />
            <p>Admin Dashboard</p>
          </div>
          <h1 className="font-bold text-xl">All Orders</h1>
          <div className="filters flex gap-4">
            {/* Status Filter */}
            <select
              className="p-2  border-none"
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            >
              <option value="">All Statuses</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            {/* Date Sort */}
            <select
              className="p-2  border-none"
              value={filter.dateSort}
              onChange={(e) =>
                setFilter({ ...filter, dateSort: e.target.value })
              }
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>

            {/* Sort by Price or Quantity */}
            <select
              className="p-2  border-none"
              value={filter.sortBy}
              onChange={(e) => setFilter({ ...filter, sortBy: e.target.value })}
            >
              <option value="price">Sort by Price</option>
              <option value="quantity">Sort by Quantity</option>
            </select>

            {/* High to Low or Low to High */}
            <select
              className="p-2  border-none"
              value={filter.order}
              onChange={(e) => setFilter({ ...filter, order: e.target.value })}
            >
              <option value="high">High to Low</option>
              <option value="low">Low to High</option>
            </select>
          </div>
          <div className="table_heading flex flex-row items-center justify-between text-bold text-[1.1rem]">
            <div className="flex flex-row items-center gap-5">
              <span>SL No</span>
              <span className="w-[8.4rem] text-center ml-0">Order No</span>
              <span>Qty</span>
              <span className="w-[8rem] text-center ml-4">Status</span>
              <span className="ml-3 w-[11rem] text-center">Ordered On</span>
              <span>Price</span>
            </div>
          </div>

          {/* Filters */}

          <div className="orders flex flex-col p-3 gap-6 overflow-y-auto h-[77vh] scrollbar-hide">
            {filteredOrders.map((item: Order, index: number) => (
              <div
                key={item._id}
                className="order_item flex flex-row justify-between items-center transition-all duration-300 ease-in-out hover:opacity-60 hover:scale-[1.02]"
                onClick={() => setSelectedOrderId(item._id ?? null)}
              >
                <div className="flex flex-row gap-2 h-[3rem] items-center">
                  <span>{index + 1}</span>
                  <span className="w-[15rem] ml-10 text-center truncate max-w-[15ch]">
                    {item._id}
                  </span>
                  <div className="quantity w-1 ml-5 text-center">
                    {item.items?.length}
                  </div>
                  <div className="status w-[8rem] ml-12 text-center">
                    {String(item.status)}
                  </div>
                  <div className="ordered_on text-center mx-5 w-[11rem]">
                    {moment(item.orderedTime).format("MMM DD, YYYY hh:mm A")}
                  </div>
                  <div className="price">
                    <span>₹{item.totalPrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Order Details */}
        <div className="right w-[40rem] mt-[1rem] h-full flex flex-col items-center">
          {order && (
            <div className="w-[35rem] max-h-[42rem] bg-components rounded-xl p-4">
              <div className="flex flex-col font-bold">
                <div className="flex flex-row justify-between items-center gap-2">
                  <div className="left flex flex-col">
                    <h1 className="flex flex-row items-center gap-2">
                      Order No: <span>{order._id}</span>
                    </h1>
                    <h1 className="flex flex-row items-center gap-2">
                      Status:
                      <select
                        className="p-2 bg-components border-none"
                        value={orderStatus}
                        onChange={(e) =>
                          setOrderStatus(e.target.value as status)
                        }
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </h1>
                  </div>
                  <div className="right">
                    <Button onClick={handleUpdateOrder} className="yellow">
                      Update
                    </Button>
                  </div>
                </div>
                <h1 className="flex flex-row items-center gap-2">
                  Ordered On:{" "}
                  <span>
                    {moment(order.orderedTime).format("MMM DD, YYYY hh:mm A")}
                  </span>
                </h1>
                <h1 className="flex flex-row items-center gap-2">
                  Payment Method: <span>{order.payment?.method}</span>
                </h1>
                <h1 className="flex flex-row items-center gap-2">
                  Total Amount: <span>₹{order.totalPrice}</span>
                </h1>
                <h1 className="flex flex-row gap-2">
                  <p className="text-nowrap">Deliver To:</p>
                  <p>{order.user?.address}</p>
                </h1>
              </div>

              {/* Order Items */}
              <div className="scrollbar-hide overflow-y-auto max-h-[30rem]">
                {order.items?.map((orderItem: Item) => (
                  <div
                    key={orderItem._id}
                    className="flex flex-row justify-between items-center px-5 py-4 border-b border-gray-700"
                  >
                    <div className="flex flex-row gap-2 items-center">
                      <div className="relative w-[7rem] h-[7rem]">
                        <Image
                          src={"/images/login-pizza.jpg"}
                          alt="Pizza"
                          fill
                          className="rounded-xl"
                        />
                      </div>
                      <div className="flex flex-col">
                        {orderItem.items?.map((ingredientItem) => (
                          <h1
                            key={ingredientItem._id}
                            className="flex flex-row items-center gap-2"
                          >
                            {ingredientItem.category.name}:{" "}
                            <span>
                              {ingredientItem.ingredients
                                .map((ing) => ing.name)
                                .join(", ")}
                            </span>
                          </h1>
                        ))}
                      </div>
                    </div>
                    <div className="price flex flex-row items-center gap-3">
                      <span>{orderItem.quantity}pc</span>
                      <span>₹{orderItem.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
