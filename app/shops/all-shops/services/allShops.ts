import api from "@/utils/axios";
import { cookies } from "next/headers";

export const fetchAllShops = async () => {
  try {
    const cookieStroe = await cookies();

    const accessToken = cookieStroe.get("accessToken")?.value;

    const res = await api.get("/shop/all", {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
