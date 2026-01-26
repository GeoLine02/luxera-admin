export interface CategoryType {
  id: number;
  category_name: string;
  category_name_ka: string;
  imageUrl: string;
}

export interface CreateCategoryType {
  id: number;
  categoryName: string;
  categoryImage: File;
}

export interface CreateSubcategoryType {
  id: number;
  subcategoryName: string;
  subcategoryImage: File;
}

export interface CreateCategoryFormValues {
  categoryName: string;
  categoryImage: File | null; // ✅ SINGLE image
  subCategories: {
    subcategoryName: string;
    subcategoryImage: File | null; // ✅ SINGLE image
  }[];
}
