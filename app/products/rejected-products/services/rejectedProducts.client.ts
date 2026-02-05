import api from "@/utils/axios";

export const refetchRejectedProducts = async (page: number) => {
  try {
    const res = await api.get(`/products/all?page=${page}&status=rejected`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
