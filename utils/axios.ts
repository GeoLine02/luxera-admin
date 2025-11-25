import axios from "axios";

const ApiUrl = process.env.API_URL_SERVER;

const isServer = typeof window === "undefined";

const api = axios.create({
  baseURL: isServer
    ? process.env.NODE_ENV === "production"
      ? ApiUrl
      : "http://localhost:4001"
    : "/api",
  withCredentials: true,
});

export default api;
