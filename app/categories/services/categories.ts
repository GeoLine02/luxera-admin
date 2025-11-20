export const fetchCategories = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/categories");

    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchCategoryById = async (categoryId: number) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/categories/${categoryId}`
    );

    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
