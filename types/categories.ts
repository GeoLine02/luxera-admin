// DTOS
interface CategoryTypeDTO {
  id?: number;
  categoryName: string;
  categoryImageFile?: File | null;
  categoryImageUrl?: string;
}

interface SubCategoryTypeDTO {
  id?: number;
  subcategoryName: string;
  categoryId?: number;
  subcategoryImageFile?: File | null;
  subcategoryImageUrl?: string;
}

interface CategoryWithSubcategoriesDTO extends CategoryTypeDTO {
  subcategories: SubCategoryTypeDTO[];
}
// Server Response Data
interface CategoryType {
  id: number;
  category_name: string;
  category_image: string;
}
interface SubCategoryType {
  id: 13;
  sub_category_name: string;
  sub_category_image: string;
  category_id: number;
}
interface CategoryDetailsType extends CategoryType {
  subCategories: SubCategoryType[];
}

export type {
  CategoryTypeDTO,
  SubCategoryTypeDTO,
  CategoryWithSubcategoriesDTO,
  CategoryDetailsType,
  CategoryType,
  SubCategoryType,
};
