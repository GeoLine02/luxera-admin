import api from "@/utils/axios";

export const refetchPendingProducts = async (page: number) => {
  try {
    const res = await api.get(`/products/all?page=${page}&status=pending`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
