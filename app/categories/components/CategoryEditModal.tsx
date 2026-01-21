"use client";

import Modal from "@/components/ui/Modal";
import {
  CategoryDetailsType,
  CategoryWithSubcategoriesDTO,
  SubCategoryTypeDTO,
} from "@/types/categories";
import { FormEvent, useEffect } from "react";
import { fetchCategoryById, updateCategory } from "../services/categories";
import CategoryForm from "./CategoryForm";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

interface CategoryEditModalProps {
  handleToggleEditModal: (categoryId?: number) => void;
  handleEditCategory: (e: FormEvent<HTMLFormElement>) => void;
  handleSelectCategoryData: (
    categoryData: CategoryWithSubcategoriesDTO,
  ) => void;
  selectedCategoryId: number | null;
  selectedCategoryData: CategoryWithSubcategoriesDTO;
  setSelectedCategoryData: React.Dispatch<
    React.SetStateAction<CategoryWithSubcategoriesDTO>
  >;
  handleDeleteSubcategory: (subcategoryId: number) => void;
}

const CategoryEditModal = ({
  handleToggleEditModal,
  handleDeleteSubcategory,
  selectedCategoryId,
  selectedCategoryData,
  setSelectedCategoryData,
}: CategoryEditModalProps) => {
  useEffect(() => {
    const handleFetchCategory = async () => {
      if (selectedCategoryId) {
        try {
          const data: CategoryDetailsType =
            await fetchCategoryById(selectedCategoryId);
          const correctData: CategoryWithSubcategoriesDTO = {
            id: data.id,
            categoryImageUrl: data.category_image,
            categoryName: data.category_name,
            subcategories: data.subCategories.map((subcat) => ({
              id: subcat.id,
              categoryId: subcat.category_id,
              subcategoryName: subcat.sub_category_name,
              subcategoryImageUrl: subcat.sub_category_image,
            })),
          };
          setSelectedCategoryData(correctData);
        } catch (e) {
          console.log(e);
          if (e instanceof AxiosError) {
            toast.error(e.response?.data.message);
            console.log(e.response?.data.message);
            return;
          }
          toast.error("Something went wrong");
          console.log("Something went wrong");
        }
      }
    };

    handleFetchCategory();
  }, [selectedCategoryId, setSelectedCategoryData]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCategoryId) return;

    // Validate before submitting
    const errors: string[] = [];

    // Check if there are any changes
    const hasChanges =
      selectedCategoryData.categoryName.trim() !== "" ||
      selectedCategoryData.categoryImageFile ||
      selectedCategoryData.subcategories.length > 0 ||
      (selectedCategoryData.deletedSubcategories &&
        selectedCategoryData.deletedSubcategories.length > 0);

    if (!hasChanges) {
      return;
    }

    // Validate subcategories
    selectedCategoryData.subcategories.forEach((subcat, index) => {
      if (!subcat.subcategoryName.trim()) {
        errors.push(`Subcategory ${index + 1} name is required`);
      }

      // New subcategories must have images
      if (!subcat.id && !subcat.subcategoryImageFile) {
        errors.push(`Subcategory ${index + 1} needs an image`);
      }
    });

    if (errors.length > 0) {
      toast.error(errors[0]); // Show first error
      return;
    }

    // Build form data
    const formData = new FormData();

    // Only append if not empty
    if (selectedCategoryData.categoryName.trim()) {
      formData.append("categoryName", selectedCategoryData.categoryName.trim());
    }

    if (selectedCategoryData.categoryImageFile) {
      formData.append("categoryImage", selectedCategoryData.categoryImageFile);
    }

    const subcategories = selectedCategoryData.subcategories.map((subcat) => {
      if (subcat.subcategoryImageFile) {
        formData.append(
          `subcategoryImage_${subcat.id}`,
          subcat.subcategoryImageFile,
        );
        return {
          subcategoryName: subcat.subcategoryName,
          tempId: subcat.id,
        };
      }
    });
    formData.append("subcategories", JSON.stringify(subcategories));

    console.log("დასააფდეითებელი დატა", selectedCategoryData);
    try {
      const response = await updateCategory(selectedCategoryId, formData);
      toast.success(response.message);
      handleToggleEditModal(); // Close on success
    } catch (error) {
      // Keep modal open on error so user can fix it
      if (error instanceof AxiosError) {
        const message =
          error.response?.data?.message || "Failed to update category";
        toast.error(message);
        console.error("Failed to update category:", error);
      } else {
        toast.error("Something went wrong");
        console.error(error);
      }
    }
  };

  return (
    <Modal
      className="space-y-4"
      modalTitle="Edit Category"
      onClose={() => handleToggleEditModal()}
    >
      <CategoryForm
        actionName="edit"
        handleDeleteSubcategory={handleDeleteSubcategory}
        selectedCategoryData={selectedCategoryData}
        onSubmit={onSubmit}
        setSelectedCategoryData={setSelectedCategoryData}
      />
    </Modal>
  );
};

export default CategoryEditModal;
