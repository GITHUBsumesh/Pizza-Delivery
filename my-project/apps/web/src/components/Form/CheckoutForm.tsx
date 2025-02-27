import React from "react";
import { Button } from "@/components/ui/button";

import { X } from "lucide-react";
import CustomCheckbox from "../Buttons/RadioButton";

interface CheckoutFormProps {
  selectedTime: "asap" | "later";
  setSelectedTime: (time: "asap" | "later") => void;
  deliveryTime: string;
  setDeliveryTime: (time: string) => void;
  deliveryDate: string;
  setDeliveryDate: (date: string) => void;
  selectedPayMode: "COD" | "RazorPay";
  setSelectedPayMode: (mode: "COD" | "RazorPay") => void;
  handlePlaceOrder: (e: React.FormEvent) => void;
  handleTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetDeliveryTime: (
    setDate: (date: string) => void,
    setTime: (time: string) => void
  ) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  selectedTime,
  setSelectedTime,
  deliveryTime,
  setDeliveryTime,
  deliveryDate,
  setDeliveryDate,
  selectedPayMode,
  setSelectedPayMode,
  handlePlaceOrder,
  handleDateChange,
  handleTimeChange,
  resetDeliveryTime,
}) => {
  const handleResetDeliveryTime = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    resetDeliveryTime(setDeliveryDate, setDeliveryTime);
  };

  return (
    <form className="checkout flex flex-col gap-4" onSubmit={handlePlaceOrder}>
      <hr />
      {/* Delivery Time Section */}
      <div className="delivery_time flex flex-col gap-3">
        <h1 className="font-bold text-xl">When do you want your pizza?</h1>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-2">
            <CustomCheckbox
              isChecked={selectedTime == "asap"}
              setIsChecked={() => setSelectedTime("asap")}
              id="asap"
            />
            <span>ASAP</span>
          </div>
          <div className="flex flex-row items-center gap-2">
            <CustomCheckbox
              isChecked={selectedTime == "later"}
              setIsChecked={() => setSelectedTime("later")}
              id="later"
            />
            <div className="flex items-center gap-2">
              <span>Later </span>
              {selectedTime == "later" && (
                <div className="flex flex-row gap-2 items-center">
                  <input
                    type="date"
                    aria-label="Date"
                    value={deliveryDate}
                    onChange={handleDateChange}
                  />
                  <input
                    aria-label="Time"
                    type="time"
                    value={deliveryTime}
                    onChange={handleTimeChange}
                  />
                  <button
                    className="bg-red-500 text-white px-2 py-2 rounded-md "
                    onClick={handleResetDeliveryTime}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <hr />

      {/* Payment Section */}
      <div className="payment flex flex-col gap-3">
        <h1 className="font-bold text-xl">How will you like to pay?</h1>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-2">
            <CustomCheckbox
              isChecked={selectedPayMode == "COD"}
              setIsChecked={() => setSelectedPayMode("COD")}
              id="COD"
            />
            <span>Cash On Delivery</span>
          </div>
          <div className="flex flex-row items-center gap-2">
            <CustomCheckbox
              isChecked={selectedPayMode == "RazorPay"}
              setIsChecked={() => setSelectedPayMode("RazorPay")}
              id="RazorPay"
            />
            <span>RazorPay</span>
          </div>
        </div>
      </div>
      <Button className="yellow mb-[2.5rem]" type="submit">
        Place Order
      </Button>
    </form>
  );
};

export default CheckoutForm;
