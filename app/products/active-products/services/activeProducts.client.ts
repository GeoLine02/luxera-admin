import api from "@/utils/axios";

export const refetchActiveProducts = async (page: number) => {
  try {
    const res = await api.get(`/products/all?page=${page}&status=active`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
