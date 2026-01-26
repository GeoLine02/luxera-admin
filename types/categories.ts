// DTOS
interface CategoryTypeDTO {
  id?: number;
  categoryName: string;
  categoryImageFile?: File | null;
  categoryImageUrl?: string;
}

interface SubCategoryTypeDTO {
  id: number | string;
  subcategoryName: string;
  categoryId?: number;
  subcategoryImageFile?: File | null;
  subcategoryImageUrl?: string;
  isNew?: boolean;
}

interface CategoryWithSubcategoriesDTO extends CategoryTypeDTO {
  subcategories: SubCategoryTypeDTO[];
  deletedSubcategories?: number[];
}
// Server Response Data
interface CategoryType {
  id: number;
  category_name: string;
  category_name_ka: string;
  imageUrl: string;
}
interface SubCategoryType {
  id: 13;
  sub_category_name: string;
  imageUrl: string;
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
