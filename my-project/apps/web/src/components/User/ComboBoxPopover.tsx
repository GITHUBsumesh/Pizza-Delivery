"use client";

import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

import Image from "next/image";

interface ComboBoxInterface {
  title: string;
  data: TypeData[];
  value?: TypeData | undefined | null;
  multipleValue?: TypeData[] | undefined | null;
  setMultipleValue?: React.Dispatch<
    React.SetStateAction<TypeData[] | undefined | null>
  >;
  setValue?: React.Dispatch<React.SetStateAction<TypeData | undefined | null>>;
  multiple?: boolean;
}

export type TypeData = {
  category?:string;
  _id: string;
  name: string;
  price: string;
  imageUrl: string;
};

export function Combobox({
  title,
  data,
  value,
  setValue,
  multipleValue,
  setMultipleValue,
  multiple = false,
}: ComboBoxInterface) {
  const [open, setOpen] = React.useState(false);

  // Calculate the total price for multiple selections.
  // Remove any non-digit/decimal characters from the price string.
  const totalPrice =
    multipleValue?.reduce((acc, item) => {
      const price = item.price;
      const parsedPrice = parseFloat(String(price).replace(/[^\d.]/g, ""));
      return acc + (isNaN(parsedPrice) ? 0 : parsedPrice);
    }, 0) ?? 0;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-transparent"
        >
          {multiple ? (
            multipleValue && multipleValue.length > 0 ? (
              <div className="flex flex-row justify-between w-full">
                <div className="flex flex-row justify-between w-full">
                  <span className="truncate max-w-[30ch]">
                    {multipleValue.map((item) => item.name).join(", ")}
                  </span>
                </div>
                <div className="flex flex-row justify-end w-full">
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
              </div>
            ) : (
              title
            )
          ) : value?.name ? (
            <div className="flex flex-row justify-between w-full">
              <p>{value.name}</p>
              <p>{value.price}</p>
            </div>
          ) : (
            title
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={title} className="h-9" />
          <CommandList>
            <CommandEmpty>
              <p className="text-muted-foreground">{`no such ${title} found`}</p>
            </CommandEmpty>
            <CommandGroup>
              {data.map((item) => (
                <div key={item._id}>
                  <HoverCard>
                    <HoverCardTrigger>
                      <CommandItem
                        value={item.name}
                        onSelect={(currentValue: string) => {
                          const selectedItem = data.find(
                            (item) => item.name === currentValue
                          );
                          if (!selectedItem) return;

                          if (!multiple) {
                            // Single selection
                            if (setValue) setValue(selectedItem);
                            setOpen(false);
                          } else {
                            // Toggle selection in multiple mode
                            if (setMultipleValue) {
                              setMultipleValue((prev) => {
                                const exists = prev?.find(
                                  (i) => i._id === selectedItem._id
                                );
                                if (exists) {
                                  // Remove it if already selected
                                  return (prev ?? []).filter((i) => i._id !== selectedItem._id);
                                } else {
                                  return [...(prev ?? []), selectedItem];
                                }
                              });
                            }
                          }
                        }}
                        className="w-full"
                      >
                        <div className="flex justify-between items-center w-full">
                          <span className="truncate max-w-[10ch]">
                            {item.name}
                          </span>
                          <div className="flex items-center gap-2">
                            <span>{item.price}</span>
                            <Check
                              className={cn(
                                "ml-auto",
                                !multiple && value?.name === item.name
                                  ? "opacity-100"
                                  : multiple &&
                                    multipleValue?.find((i) => i.name === item.name)
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </div>
                        </div>
                      </CommandItem>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-60">
                      <div className="flex justify-start space-x-4">
                        <Image
                          src={"/images/login-pizza.jpg"}
                          alt={item.name}
                          width={100}
                          height={50}
                          className="rounded-md object-cover"
                        />
                        <div className="space-y-1 flex flex-col">
                          <h4 className="text-sm font-semibold">
                            {item.name}
                          </h4>
                          <p className="text-sm">{item.price}</p>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
