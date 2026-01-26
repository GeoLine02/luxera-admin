"use client";

import { Button } from "@/components/ui/Button";
import {
  CategoryType,
  CategoryWithSubcategoriesDTO,
  SubCategoryTypeDTO,
} from "@/types/categories";
import { FormEvent, useState } from "react";
import CategoryEditModal from "./CategoryEditModal";
import CategoryDeleteModal from "./CategoryDeleteModal";
import AddCategory from "./AddCategory";
import CategoryCreateModal from "./CategoryCreateModal";

import placeHolderImage from "@/public/placeholder.jpg";
import { deleteCategory } from "../services/categories";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import CategoryCard from "./CategoryCard";

interface CategoriesListProps {
  categories: CategoryType[];
}

export const CategoriesList = ({ categories }: CategoriesListProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );
  const [selectedCategoryData, setSelectedCategoryData] =
    useState<CategoryWithSubcategoriesDTO>({
      categoryName: "",
      subcategories: [],
      categoryImageFile: null,
      categoryImageUrl: undefined,
      id: undefined,
      deletedSubcategories: undefined,
    });

  const handleToggleEditModal = (categoryId?: number) => {
    if (isEditModalOpen) {
      setSelectedCategoryData({
        categoryName: "",
        subcategories: [],
        categoryImageFile: null,
      });
    }
    setIsEditModalOpen(!isEditModalOpen);
    setSelectedCategoryId(categoryId ?? null);
  };

  const handleToggleDeleteModal = (categoryId?: number) => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
    setSelectedCategoryId(categoryId ?? null);
  };

  const handleToggleCreateModal = () => {
    setIsCreateModalOpen(!isCreateModalOpen);
    if (isCreateModalOpen)
      setSelectedCategoryData({
        categoryName: "",
        subcategories: [],
      });
  };

  const handleEditCategory = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  // ...existing code...
  const handleDeleteSubcategory = (subcategoryId: number | string) => {
    const filteredSubcategories = selectedCategoryData?.subcategories.filter(
      (subcategory: SubCategoryTypeDTO) => subcategory.id !== subcategoryId,
    ) as SubCategoryTypeDTO[];

    setSelectedCategoryData((prevValues) => {
      return {
        ...prevValues,
        subcategories: filteredSubcategories, // Consistent naming
      };
    });
  };
  // ...existing code...
  const handleDeleteCategory = async () => {
    handleToggleDeleteModal();
    if (selectedCategoryId) {
      try {
        await deleteCategory(selectedCategoryId);
        toast.success("Category deleted successfully");
        setSelectedCategoryId(null);
        // refresh
        window.location.reload();
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.data.message) {
            toast.error(error.response?.data.message);
            return;
          }
          toast.error("Something went wrong");
          console.error("Failed to delete category:", error);
        }
      }
    }
  };

  const handleSelectCategoryData = (
    categoryData: CategoryWithSubcategoriesDTO,
  ) => {
    setSelectedCategoryData(categoryData);
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
      {isEditModalOpen && (
        <CategoryEditModal
          handleDeleteSubcategory={handleDeleteSubcategory}
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
          handleDeleteSubcategory={handleDeleteSubcategory}
          handleSelectCategoryData={handleSelectCategoryData}
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
