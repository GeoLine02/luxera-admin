"use client";

import Modal from "@/components/ui/Modal";
import CategoryForm from "./CategoryForm";
import {
  CategoryWithSubcategoriesDTO,
  SubCategoryTypeDTO,
} from "@/types/categories";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { createCategory } from "../services/categories";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

interface AddCategoryModalProps {
  handleToggleCreateModal: (categoryId?: number) => void;
  handleDeleteSubcategory: (categoryId: number) => void;
  handleSelectCategoryData: (
    categoryData: CategoryWithSubcategoriesDTO
  ) => void;
  selectedCategoryData: CategoryWithSubcategoriesDTO;
  selectedCategoryId: number | null;
  setSelectedCategoryData: Dispatch<
    SetStateAction<CategoryWithSubcategoriesDTO>
  >;
}

const CategoryCreateModal = ({
  handleToggleCreateModal,
  handleDeleteSubcategory,
  selectedCategoryData,
  setSelectedCategoryData,
}: AddCategoryModalProps) => {
  const onCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("category data: ", selectedCategoryData);

    try {
      // Create FormData to handle file upload
      const formData = new FormData();

      formData.append("categoryName", selectedCategoryData.categoryName);

      // Add image file if it exists

      if (!selectedCategoryData.categoryImageFile) return; // or raise validation error
      formData.append("categoryImage", selectedCategoryData.categoryImageFile);
      const subcategoryImagesMap: Record<number, File> = {};
      const subcategories = selectedCategoryData.subcategories
        .map((subcat: SubCategoryTypeDTO, index: number) => {
          if (!subcat.subcategoryImageFile) return null;
          subcategoryImagesMap[index] = subcat.subcategoryImageFile;
          return {
            subcategoryName: subcat.subcategoryName,
          };
        })
        .filter((name) => name !== null);
      formData.append("subcategories", JSON.stringify(subcategories));

      for (const [index, file] of Object.entries(subcategoryImagesMap)) {
        formData.append(`subcategoryImage_${index}`, file);
      }

      const response = await createCategory(formData);
      console.log("response", response);

      setSelectedCategoryData({
        categoryName: "",
        categoryImageUrl: "",
        categoryImageFile: null,
        subcategories: [],
      });

      // Close modal
      toast.success("Category created successfully");
      handleToggleCreateModal();
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.message) {
          toast.error(error.response?.data.message);
          return;
        }
        toast.error("Something went wrong");
        console.error("Failed to create category:", error);
      }

      // You can add error handling UI here (toast, alert, etc.)
    }
  };

  return (
    <Modal
      modalTitle="Create Category"
      onClose={() => handleToggleCreateModal()}
    >
      <CategoryForm
        setSelectedCategoryData={setSelectedCategoryData}
        selectedCategoryData={selectedCategoryData}
        handleDeleteSubcategory={handleDeleteSubcategory}
        onSubmit={onCreate}
        actionName="create"
      />
    </Modal>
  );
};

export default CategoryCreateModal;
