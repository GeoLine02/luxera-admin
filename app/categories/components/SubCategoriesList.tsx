"use client";

import { SubCategoryTypeDTO } from "@/types/categories";
import SubCategoryCard from "./SubcategoryCard";

interface SubCategoriesListProps {
  subCategories: SubCategoryTypeDTO[];
  handleDeleteSubcategory: (categoryId: number) => void;
}

export const SubCategoriesList = ({
  subCategories,
  handleDeleteSubcategory,
}: SubCategoriesListProps) => {
  return (
    <div className="flex flex-wrap gap-4 w-full">
      {subCategories.map((subCategory, index) => (
        <SubCategoryCard
          id={subCategory.id}
          key={index}
          subCategoryName={subCategory.subcategoryName}
          handleDeleteSubcategory={handleDeleteSubcategory}
        />
      ))}
    </div>
  );
};
