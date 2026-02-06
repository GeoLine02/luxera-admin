import api from "@/utils/axios";

export const refetchAllShops = async (page: number) => {
  try {
    const res = await api.get(`/shop/all?page=${page}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
