import api from "@/utils/axios";
import { cookies } from "next/headers";

export const fetchRejectedProducts = async (page: number) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await api.get(`/products/all?page=${page}&status=rejected`, {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
