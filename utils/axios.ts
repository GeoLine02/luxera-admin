import axios from "axios";

const isServer = typeof window === "undefined";

const api = axios.create({
  baseURL: isServer
    ? process.env.NODE_ENV === "production"
      ? process.env.API_URL_SERVER
      : "http://localhost:4001"
    : "/api",
  withCredentials: true,
});

export default api;
