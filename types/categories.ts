export interface CategoryType {
  id: number;
  categoryName: string;
  categoryImage: string | File | null;
}

export interface SubCategoryType {
  id: number;
  subCategoryName: string;
  subCategoryImage: string | File | null;
  categoryId: number;
}

export interface CategoryWithSubcategories extends CategoryType {
  subCategories: SubCategoryType[];
}
