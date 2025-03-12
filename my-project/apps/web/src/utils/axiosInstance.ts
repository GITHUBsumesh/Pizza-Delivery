import axios from "axios";

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL; // Load from env
// console.log("BASE_API_URL:",BASE_API_URL);

// Validate environment variable
if (!BASE_API_URL) {
  throw new Error("Missing NEXT_PUBLIC_BASE_API_URL environment variable");
}
export const createAxiosInstance = (subPath = "") => {
  return axios.create({
    baseURL: `${BASE_API_URL}${subPath}`,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
