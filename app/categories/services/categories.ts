import api from "@/utils/axios";

export const fetchCategories = async () => {
  try {
    const res = await api.get(`/categories`);

    if (res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchCategoryById = async (categoryId: number) => {
  try {
    const res = await api.get(`/categories/${categoryId}`);

    if (res.status === 200) {
      const data = await res.data.data;
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const createCategory = async (categoryData: FormData) => {
  try {
    const res = await api.post(`/categories`, categoryData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.status === 201 || res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const updateCategory = async (
  categoryId: number,
  categoryData: FormData
) => {
  try {
    const res = await api.patch(
      `/categories/${categoryId}/batch`,
      categoryData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (res.status === 200 || res.status === 201) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const deleteCategory = async (categoryId: number) => {
  try {
    const res = await api.delete(`/categories/${categoryId}`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
