import axios from "axios";

export const apiKey = process.env.NEXT_PUBLIC_API_KEY;

const api = axios.create({
  baseURL: apiKey,
  withCredentials: true,
});

export default api;
