import api from "@/utils/axios";
import { cookies } from "next/headers";

export const fetchPendingProducts = async (page: number) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await api.get(`/products/all?page=${page}&status=pending`, {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
