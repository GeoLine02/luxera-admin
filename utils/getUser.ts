import { cookies } from "next/headers";
// import api from "./axios";

export const getUser = async () => {
  try {
    const cookie = await cookies();
    const accessToken = cookie.get("accessToken")?.value;

    const res = await fetch("https://luxera-admin-api.onrender.com/", {
      headers: {
        "Content-Type": "appliction/json",
        authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data);
      return data;
    }

    // const refreshToken = cookie.get("refreshToken")?.value;

    // const res = await api.get(`/api/user`, {
    //   // cache: "no-store", // Important: don't cache user data
    //   headers: {
    //     "Content-Type": "application/json",
    //     authorization: `Bearer ${accessToken}`,
    //   },
    // });
    // const data = res.data;
    // console.log(data);
    // return data;
  } catch (error) {
    console.error("getUser error:", error);
    return null;
  }
};
