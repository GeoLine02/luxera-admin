"use client";

import { Button } from "@/components/ui/Button";
import { CategoryType, CategoryWithSubcategories } from "@/types/categories";
import { FormEvent, useState } from "react";
import CategoryEditModal from "./CategoryEditModal";
import CategoryDeleteModal from "./CategoryDeleteModal";
import AddCategory from "./AddCategory";
import CategoryCreateModal from "./CategoryCreateModal";

interface CategoryCardProps {
  id: number;
  categoryName: string;
  categoryImage: string;
  handleToggleDeleteModal: (categoryId: number) => void;
  handleToggleEditModal: (categoryId: number) => void;
}

const CategoryCard = ({
  id,
  categoryName,
  handleToggleDeleteModal,
  handleToggleEditModal,
}: CategoryCardProps) => {
  return (
    <div className="flex items-center justify-between w-full max-w-[49%] bg-medium-gray p-2 rounded-md">
      <div className="flex items-center gap-2">
        <div className="w-14 aspect-square rounded-md bg-gray-500"></div>
        <h1 className="font-medium">{categoryName}</h1>
      </div>
      <div className="flex gap-2 items-center">
        <Button onClick={() => handleToggleEditModal(id)} variant="default">
          Edit
        </Button>
        <Button onClick={() => handleToggleDeleteModal(id)} variant="default">
          Delete
        </Button>
      </div>
    </div>
  );
};

interface CategoriesListProps {
  categories: CategoryType[];
}

export const CategoriesList = ({ categories }: CategoriesListProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [selectedCategoryData, setSelectedCategoryData] =
    useState<CategoryWithSubcategories>({
      categoryImage: "",
      categoryName: "",
      id: Infinity,
      subCategories: [],
    });

  const handleToggleEditModal = (categoryId?: number) => {
    setIsEditModalOpen(!isEditModalOpen);
    setSelectedCategoryId(categoryId ?? null);
    if (isEditModalOpen)
      setSelectedCategoryData({
        categoryImage: "",
        categoryName: "",
        id: Infinity,
        subCategories: [],
      });
  };
  console.log("selectedCategoryData", selectedCategoryData);
  const handleToggleDeleteModal = (categoryId?: number) => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
    setSelectedCategoryId(categoryId ?? null);
  };

  const handleToggleCreateModal = () => {
    setIsCreateModalOpen(!isCreateModalOpen);
    if (isCreateModalOpen)
      setSelectedCategoryData({
        categoryImage: "",
        categoryName: "",
        id: Infinity,
        subCategories: [],
      });
  };

  const handleEditCategory = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const handleDeleteCategory = () => {};

  const handleSelectCategoryData = (
    categoryData: CategoryWithSubcategories
  ) => {
    setSelectedCategoryData(categoryData);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <CategoryCard
          key={category?.id}
          id={category?.id}
          categoryImage=""
          categoryName={category.categoryName}
          handleToggleDeleteModal={handleToggleEditModal}
          handleToggleEditModal={handleToggleEditModal}
        />
      ))}
      <AddCategory handleToggleCreateModal={handleToggleCreateModal} />
      {isEditModalOpen && (
        <CategoryEditModal
          setSelectedCategoryData={setSelectedCategoryData}
          handleSelectCategoryData={handleSelectCategoryData}
          selectedCategoryData={selectedCategoryData}
          selectedCategoryId={selectedCategoryId}
          handleEditCategory={handleEditCategory}
          handleToggleEditModal={handleToggleEditModal}
        />
      )}
      {isCreateModalOpen && (
        <CategoryCreateModal
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryData={setSelectedCategoryData}
          selectedCategoryData={selectedCategoryData}
          handleSelectCategoryData={handleSelectCategoryData}
          handleDeleteSubCategory={handleDeleteCategory}
          handleToggleCreateModal={handleToggleCreateModal}
        />
      )}
      {isDeleteModalOpen && (
        <CategoryDeleteModal
          handleCloseDeleteModal={handleToggleDeleteModal}
          handleDeleteCategory={handleDeleteCategory}
        />
      )}
    </div>
  );
};
