"use client";
import { ComboboxInventory } from "@/components/Admin/ComboBox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useAddInventory,
  useInventory,
  useUpdateInventory,
} from "@/hooks/useInventoryAdmin";
import { Ingredient, Inventory } from "@/utils/models";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const Page = () => {
  const { data,isFetching } = useInventory();
  const { mutate: addItem } = useAddInventory();
  const { mutate: updateItem } = useUpdateInventory();
  const [filterCategory, setFilterCategory] = useState(""); // Category filter
  const [sortType, setSortType] = useState(""); // Sorting type
  const [sortOrder, setSortOrder] = useState("asc"); // Sorting order
  const [addNewItem, setAddNewItem] = useState<boolean>(true);
  const [ingredient, setIngredient] = useState<{
    _id: string;
    name: string;
    price: number;
    stock: number;
  }>({ _id: "", name: "", price: 0, stock: 0 });
  const [category, setCategory] = useState<string>("");

  if (isFetching) return <p>Loading...</p>;

  // Filter inventory by category
  const filteredData = filterCategory
    ? data!.filter((item: Inventory) => item.category.name === filterCategory)
    : data;

  // Get all ingredients directly from the API response
  let ingredientsList = filteredData!.flatMap(
    (categoryItem) => categoryItem.ingredients
  );

  // Sorting logic
  const sortInventory = (type: string, order: string) => {
    return [...ingredientsList].sort((a, b) => {
      let valA, valB;
      if (type === "price") {
        valA = a.price;
        valB = b.price;
      } else if (type === "stock") {
        valA = a.stock;
        valB = b.stock;
      } else if (type === "category") {
        valA = a.category!.name.toLowerCase();
        valB = b.category!.name.toLowerCase();
      }
      if (valA! < valB!) return order === "asc" ? -1 : 1;
      if (valA! > valB!) return order === "asc" ? 1 : -1;
      return 0;
    });
  };

  ingredientsList = sortType
    ? sortInventory(sortType, sortOrder)
    : ingredientsList;

  const handleSelect = (ingredient: Ingredient) => {
    setAddNewItem(false);
    setIngredient({
      _id: ingredient._id,
      name: ingredient.name,
      price: ingredient.price,
      stock: ingredient.stock!,
    });
    setCategory(ingredient.category!.name);
  };
  const handleAddNewItem = () => {
    setAddNewItem(true);
    setCategory("");
    setIngredient({ _id: "", name: "", price: 0, stock: 0 });
  };

  const handleAddItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const item = {
      name: ingredient.name,
      stock: ingredient.stock,
      price: ingredient.price,
      categoryName: category,
    };
    addItem(item);
  };
  const handleUpdateItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const item = {
      name: ingredient.name,
      stock: ingredient.stock,
      price: ingredient.price,
      categoryName: category,
    };
    updateItem({
      item: item,
      ingredientId: ingredient._id,
    });
  };
  return (
    <div className="w-full h-[calc(100vh-3rem)] relative overflow-x-hidden overflow-y-hidden flex flex-row center">
      <div className="h-full w-full flex flex-row ml-[3rem] pb-5 gap-8">
        {/* LEFT SECTION */}
        <div className="left w-[50vw] h-screen flex flex-col text-[#a9a9a9] gap-4 mb-5">
          <div className="top flex flex-row">
            <ArrowLeft />
            <p>Back To Home</p>
          </div>
          <h1 className="font-bold text-xl">Inventory</h1>

          {/* Filter & Sort Controls */}
          <div className="flex flex-row justify-between gap-4 mb-4">
            <div className="flex flex-row gap-4 ">
              <select
                className="border p-2"
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {data
                  .map((item: Inventory) => item.category.name)
                  .map((cat: string) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
              </select>

              <select
                className="border p-2"
                onChange={(e) => setSortType(e.target.value)}
              >
                <option value="">Sort By</option>
                <option value="price">Price</option>
                <option value="stock">Stock</option>
                <option value="category">Category</option>
              </select>
              <select
                className="border p-2"
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
              </select>
            </div>
            <Button className="yellow" onClick={handleAddNewItem}>
              New
            </Button>
          </div>

          {/* Inventory Table Header */}
          <div className="flex flex-row items-center justify-between font-bold text-[1.1rem]">
            <div className="flex flex-row items-center gap-5">
              <span>Sl no</span>
              <span className="w-16">Type</span>
              <span>Item</span>
            </div>
            <div className="flex flex-row items-center gap-9">
              <span>Stock</span>
              <span>Price</span>
            </div>
          </div>

          {/* Inventory List */}
          <div className="orders flex flex-col p-3 gap-6 overflow-y-auto h-[65vh] scrollbar-hide">
            {ingredientsList.map((ingredientItem, index) => (
              <div
                key={ingredientItem._id}
                className="order_item flex flex-row justify-between items-center transition-all duration-300 ease-in-out hover:opacity-60 hover:scale-[1.02]"
                onClick={() => handleSelect(ingredientItem)}
              >
                <div className="flex flex-row gap-4 h-[3rem] items-center">
                  <span className="w-[2rem]">{index + 1}</span>
                  <h1 className="w-16">{ingredientItem.category!.name}</h1>
                  <div className="flex flex-row gap-2 h-full">
                    <div className="relative w-[3.5rem] h-[3.5rem]">
                      <Image
                        src={"/images/login-pizza.jpg"}
                        alt="Pizza"
                        fill
                        className="rounded-xl"
                      />
                    </div>
                    <div className="flex flex-col items-start justify-center">
                      <h1 className="font-bold">{ingredientItem.name}</h1>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-14">
                  <div className="delivery_on">{ingredientItem.stock}</div>
                  <div className="price">
                    <span>₹{ingredientItem.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="right w-[40rem] max-h-[25rem] mt-[7rem] rounded-xl flex flex-row items-center bg-components ">
          {/* <div className="w-[35rem] max-h-[35rem] overflow-hidden bg-components rounded-xl gap-5"> */}
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
          <form
            onSubmit={addNewItem ? handleAddItem : handleUpdateItem}
            className="right flex-col flex-1 flex items-start justify-center text-xl gap-3 mr-4"
          >
            <ComboboxInventory value={category} setValue={setCategory} />

            {/* Name Input */}
            <Input
              type="text"
              placeholder="Name"
              value={ingredient?.name ?? ""}
              onChange={(e) =>
                setIngredient({ ...ingredient, name: e.target.value })
              }
              required
            />

            {/* Stock Input */}
            <Input
              type="number"
              placeholder="Stock"
              value={
                addNewItem && ingredient.stock === 0
                  ? ""
                  : ingredient.stock.toString()
              }
              onChange={(e) =>
                setIngredient({ ...ingredient, stock: Number(e.target.value) })
              }
              required
            />

            {/* Price Input */}
            <Input
              type="number"
              placeholder="Price"
              value={
                addNewItem && ingredient.price === 0
                  ? ""
                  : ingredient.price.toString()
              }
              onChange={(e) =>
                setIngredient({ ...ingredient, price: Number(e.target.value) })
              }
              required
            />

            <div className="bottom flex flex-row justify-between w-full gap-2">
              <div className="flex flex-row items-center gap-2">
                <Button className="yellow" type="submit">
                  {addNewItem ? "Add" : "Update"}
                </Button>
              </div>
            </div>
          </form>

          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default Page;
