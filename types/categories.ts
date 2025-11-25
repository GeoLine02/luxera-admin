
export interface CategoryType {
  id: number | undefined;
  categoryName: string;
  categoryImage: string;
  categoryImageFile?: File | null;
}

export interface SubCategoryType {
  id: number;
  subCategoryName: string;
  subCategoryImage: string | undefined;
  categoryId: number | undefined;
  subCategoryImageFile: File | null;
}

export interface CategoryWithSubcategories extends CategoryType {
  subCategories: SubCategoryType[];
}



