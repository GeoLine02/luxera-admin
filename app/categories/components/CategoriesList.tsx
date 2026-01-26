"use client";

import { useState } from "react";
import AddCategory from "./AddCategory";
import CategoryCard from "./CategoryCard";
import { CategoryType } from "@/types/categories";
import CategoryCreateModal from "./CategoryCreateModal";

interface CategoriesListProps {
  categories: CategoryType[];
}

export const CategoriesList = ({ categories }: CategoriesListProps) => {
  console.log(categories);

  // const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );

  const [selectedCategoryData, setSelectedCategoryData] = useState({
    categoryName: "",
    subcategories: [],
    categoryImageFile: null,
    categoryImageUrl: undefined,
    id: undefined,
    deletedSubcategories: undefined,
  });

  const handleToggleDeleteModal = (categoryId?: number) => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
    setSelectedCategoryId(categoryId ?? null);
  };

  const handleToggleCreateModal = () => {
    setIsCreateModalOpen(!isCreateModalOpen);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {categories !== undefined &&
        categories.map((category) => (
          <CategoryCard
            key={category?.id}
            id={category?.id}
            categoryImage={category.imageUrl}
            categoryName={category.category_name}
            handleToggleDeleteModal={handleToggleDeleteModal}
            handleToggleEditModal={() => {}}
          />
        ))}
      <AddCategory handleToggleCreateModal={handleToggleCreateModal} />
      {/* {isEditModalOpen && (
        <CategoryEditModal
          handleDeleteSubcategory={handleDeleteSubcategory}
          setSelectedCategoryData={setSelectedCategoryData}
          handleSelectCategoryData={handleSelectCategoryData}
          selectedCategoryData={selectedCategoryData}
          selectedCategoryId={selectedCategoryId}
          handleEditCategory={handleEditCategory}
          handleToggleEditModal={handleToggleEditModal}
        />
      )} */}
      {isCreateModalOpen && (
        <CategoryCreateModal
          handleToggleCreateModal={handleToggleCreateModal}
        />
      )}
      {/* {isDeleteModalOpen && (
        <CategoryDeleteModal
          handleCloseDeleteModal={handleToggleDeleteModal}
          handleDeleteCategory={handleDeleteCategory}
        />
      )} */}
    </div>
  );
};
