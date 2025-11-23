
export interface CategoryType {
  id: number;
  categoryName: string;
  categoryImage: string;
  categoryImageFile?: File | null;
}

export interface SubCategoryType {
  id: number;
  subCategoryName: string;
  subCategoryImage: string;
  categoryId: number;
  subCategoryImageFile: File | null;
}

export interface CategoryWithSubcategories extends CategoryType {
  subCategories: SubCategoryType[];
}
