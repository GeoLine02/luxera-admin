import api from "@/utils/axios";

export const approveProduct = async (
  productId: number,
  shopId: number,
  recipientId: number,
) => {
  try {
    const res = await api.patch(`/products/approveProduct/${productId}`, {
      shopId,
      recipientId,
      message: `Product with id ${productId} has been approved`,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const rejectProduct = async (
  productId: number,
  shopId: number,
  message: string,
  recipientId: number,
) => {
  try {
    const res = await api.patch(`/products/rejectProduct/${productId}`, {
      shopId,
      message,
      recipientId,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
