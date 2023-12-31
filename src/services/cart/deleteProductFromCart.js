import { axiosInstance } from "../../api/axiosInstance";

export const deleteProductFromCart = async (cartProductId, token) => {
  try {
    await axiosInstance.delete(`cart/${cartProductId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    if (error.response)
      throw typeof error.response.data === "string"
        ? new Error(error.response.data)
        : error.response.data;

    else throw new Error("Something went from when attempting to delete from cart");
  }
};