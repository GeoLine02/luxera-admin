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
  categoryNameKa: string;
  categoryImage: File | null; // ✅ SINGLE image
  subCategories: {
    subcategoryName: string;
    subcategoryImage: File | null; // ✅ SINGLE image
    subcategoryNameKa: string;
  }[];
}
export interface UpdateSubCategoryFormValues {
  id?: number; // Database ID for existing items
  subcategoryName: string;
  subcategoryNameKa: string;
  subcategoryImage: File | null;
  subcategoryImageUrl?: string; // URL of existing image
  subcategoryImageS3Key?: string; // S3 key for existing image
}

export interface UpdateCategoryFormValues {
  categoryName: string;
  categoryNameKa: string;
  categoryImage: File | null;
  categoryImageS3Key?: string; // S3 key for existing image
  subCategories: UpdateSubCategoryFormValues[];
}
export interface SubCategoryResponse {
  id: number;
  sub_category_name: string;
  sub_category_name_ka: string;
  subcategory_image_s3_key: string;
  category_id: number;
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
}

export interface CategoryResponse {
  id: number;
  category_name: string;
  category_name_ka: string;
  category_image_s3_key: string;
  createdAt: string;
  updatedAt: string;
  subCategories: SubCategoryResponse[];
  imageUrl: string;
}
