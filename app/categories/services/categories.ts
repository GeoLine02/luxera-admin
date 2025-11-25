import { CategoryWithSubcategories } from "@/types/categories";
import api from "@/utils/axios";
import axios from "axios";


export const fetchCategories = async () => {
  try {
    const res = await api.get("/categories");

    if (res.status === 200) {
      const data = res;
      return data.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchCategoryById = async (categoryId: number) => {
  try {
    const res = await api.get(`/categories/${categoryId}`);

    if (res.status === 200) {
      const data = res;
      return data.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchPostCategory = async (
  CategoryUserData: CategoryWithSubcategories
) => {
  try {
    const res = await api.post(
      "/categories",
      CategoryUserData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (res.status === 200) {
      console.log("category posted!" + CategoryUserData);
    }

    return res.data;

  } catch (err) {
    console.log(err);
  }
};