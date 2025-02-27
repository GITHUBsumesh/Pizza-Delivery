import { toast } from "react-hot-toast";

// Get current date & time
const now = new Date();
export const currentDate = now.toISOString().split("T")[0]; // "YYYY-MM-DD"
export const currentTime = now.toTimeString().slice(0, 5); // "HH:MM"

// Max selectable date (10 days ahead)
const maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 10);
export const maxDateString = maxDate.toISOString().split("T")[0]; // "YYYY-MM-DD"

// Function to validate and adjust date
export const validateDate = (date: string): string => {
  const selectedDate = new Date(date);
  const today = new Date(currentDate);

  if (selectedDate < today) {
    toast.error("You cannot select a past date!");
    return currentDate;
  } else if (selectedDate > maxDate) {
    toast.error("You cannot select more than 10 days in the future!");
    return currentDate;
  }
  return date;
};

// Function to validate and adjust time
export const validateTime = (time: string, date: string): string => {
  const [selectedHours, selectedMinutes] = time.split(":").map(Number);
  const [currentHours, currentMinutes] = currentTime.split(":").map(Number);

  if (
    date === currentDate &&
    (selectedHours < currentHours || (selectedHours === currentHours && selectedMinutes < currentMinutes))
  ) {
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay.toISOString().split("T")[0]; // Move date to next day
  }
  return date;
};

// Function to reset delivery time to current time
export const resetDeliveryTime = (setDate: (date: string) => void, setTime: (time: string) => void) => {
  setDate(currentDate);
  setTime(currentTime);
  toast.success("Delivery time reset to current time.");
};

// Function to get final ISO date-time string
export const getISODateTime = (date: string, time: string): Date => {
  if (!date || !time) return new Date()

  const [hours, minutes] = time.split(":").map(Number);
  const formattedDate = new Date(date);
  formattedDate.setHours(hours, minutes, 0, 0);

  return formattedDate;
};
