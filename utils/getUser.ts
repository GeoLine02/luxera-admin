import { cookies } from "next/headers";
import api from "./axios";

export const getUser = async () => {
  try {
    const cookie = await cookies();
    const accessToken = cookie.get("accessToken")?.value;

    // const refreshToken = cookie.get("refreshToken")?.value;

    const res = await api.get(`${process.env.API_BASE_URL}/user`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
    });
    const data = res.data;
    console.log(data);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.status === 401) {
      return null;
    }
  }
};
