"use client";

import { useState } from "react";
import AddCategory from "./AddCategory";
import CategoryCard from "./CategoryCard";
import { CategoryType } from "@/types/categories";
import CategoryCreateModal from "./CategoryCreateModal";
import CategoryEditModal from "./CategoryEditModal";
import CategoryDeleteModal from "./CategoryDeleteModal";
import { deleteCategory } from "../services/categories";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

interface CategoriesListProps {
  categories: CategoryType[];
}

export const CategoriesList = ({ categories }: CategoriesListProps) => {
  console.log(categories);

  // const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
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

  const handleToggleDeleteModal = (categoryId: number | undefined) => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
    if (categoryId) {
      setSelectedCategoryId(categoryId);
    }
  };

  const handleToggleCreateModal = () => {
    setIsCreateModalOpen(!isCreateModalOpen);
  };
  const handleToggleEditModal = (id: number | undefined) => {
    setIsEditModalOpen(!isEditModalOpen);
    if (id) {
      setSelectedCategoryId(id);
    }
  };
  const handleDeleteCategory = async () => {
    try {
      if (!selectedCategoryId) {
        return;
      }
      const response = await deleteCategory(selectedCategoryId);
      toast.success(response.message);
      setIsDeleteModalOpen(!isDeleteModalOpen);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
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
            handleToggleEditModal={handleToggleEditModal}
          />
        ))}
      <AddCategory handleToggleCreateModal={handleToggleCreateModal} />

      {isEditModalOpen && selectedCategoryId && (
        <CategoryEditModal
          categoryId={selectedCategoryId}
          handleToggleEditModal={handleToggleEditModal}
        />
      )}
      {isCreateModalOpen && (
        <CategoryCreateModal
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
