import api from "@/utils/axios";

export const deleteProduct = async (productId: number) => {
  try {
    const res = await api.delete(`/products/${productId}`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchProductById = async (productId: number) => {
  try {
    const res = await api.get(`/products/${productId}`);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
