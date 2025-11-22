import { cookies } from "next/headers";
import api, { apiKey } from "./axios";

export const getUser = async () => {
  try {
    const cookie = await cookies();
    const accessToken = cookie.get("accessToken")?.value;
    // const refreshToken = cookie.get("refreshToken")?.value;

    const res = await api.get(`/api/user`, {
      // cache: "no-store", // Important: don't cache user data
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
    });

    // if (!res.ok) {
    //   if (res.status === 401 && refreshToken) {
    //     const res = await fetch("http://localhost:3000/api/auth/refresh", {
    //       headers: {
    //         "Content-Type": "application/json",
    //         authorization: `Bearer ${refreshToken}`,
    //       },
    //     });

    //     if (res.status === 401) {
    //       return null;
    //     }
    //     const data = await res.json();

    //     cookie.set("accessToken", data.accessToken);
    //   }
    // }
    const data = res.data;
    console.log(data)
    return data;
  } catch (error) {
    console.error("getUser error:", error);
    return null;
  }
};