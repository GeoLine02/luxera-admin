"use client";

import { SubCategoryTypeDTO } from "@/types/categories";
import { X } from "lucide-react";

interface SubCategoryCardProps {
  id?: number;
  subCategoryName: string;
  handleDeleteSubCategory: (categoryId: number) => void;
}

const SubCategoryCard = ({
  id,
  subCategoryName,
  handleDeleteSubCategory,
}: SubCategoryCardProps) => {
  const handleDelete = () => {
    if (id !== undefined) {
      handleDeleteSubCategory(id);
    }
  };

  return (
    <div className="border-white border-2 rounded-full flex items-center gap-2 p-1 px-2">
      <h1 className="font-medium">{subCategoryName}</h1>
      <span>
        <X onClick={handleDelete} size={15} className="cursor-pointer" />
      </span>
    </div>
  );
};

interface SubCategoriesListProps {
  subCategories: SubCategoryTypeDTO[];
  handleDeleteSubCategory: (categoryId: number) => void;
}

export const SubCategoriesList = ({
  subCategories,
  handleDeleteSubCategory,
}: SubCategoriesListProps) => {
  return (
    <div className="flex flex-wrap gap-4 w-full">
      {subCategories.map((subCategory, index) => (
        <SubCategoryCard
          id={subCategory.id}
          key={index}
          subCategoryName={subCategory.subcategoryName}
          handleDeleteSubCategory={handleDeleteSubCategory}
        />
      ))}
    </div>
  );
};
