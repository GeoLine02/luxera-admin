import api from "@/utils/axios";

export const fetchShopById = async (shopId: number) => {
  try {
    const res = await api.get(`/shop/${shopId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteShopById = async (shopId: number) => {
  try {
    const res = await api.delete(`/shop/${shopId}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
