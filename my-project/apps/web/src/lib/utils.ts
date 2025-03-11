import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const formatTimestamp = (isoString: string) => {
  const date = new Date(isoString);

  // UTC Format
  const utcFormat = date.toISOString().replace("T", " ").replace("Z", " UTC");

  // IST Format (Indian Standard Time)
  const optionsIST = { timeZone: "Asia/Kolkata", hour12: true, 
                       year: "numeric" as "numeric" | "2-digit", month: "long" as "long" | "short" | "narrow", day: "numeric" as "numeric" | "2-digit", 
                       hour: "2-digit" as "numeric" | "2-digit", minute: "2-digit" as "numeric" | "2-digit", second: "2-digit" as "numeric" | "2-digit" };
  const istFormat = date.toLocaleString("en-IN", optionsIST) + " IST";

  // DD-MM-YYYY HH:mm:ss
  const ddmmyyyyFormat = `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;

  return { utcFormat, istFormat, ddmmyyyyFormat };
};