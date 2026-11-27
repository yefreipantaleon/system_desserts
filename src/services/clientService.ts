import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
const API_DELAY = Number(import.meta.env.VITE_API_DELAY ?? 1200);

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.response.use(async (response) => {
  if (API_DELAY > 0 && response.config.method === "get") {
    await new Promise((resolve) => setTimeout(resolve, API_DELAY));
  }
  return response;
});