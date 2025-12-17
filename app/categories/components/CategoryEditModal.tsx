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
    categoryData: CategoryWithSubcategoriesDTO
  ) => void;
  selectedCategoryId: number | null;
  selectedCategoryData: CategoryWithSubcategoriesDTO;
  setSelectedCategoryData: React.Dispatch<
    React.SetStateAction<CategoryWithSubcategoriesDTO>
  >;
}

const CategoryEditModal = ({
  handleToggleEditModal,

  selectedCategoryId,
  selectedCategoryData,
  setSelectedCategoryData,
}: CategoryEditModalProps) => {
  useEffect(() => {
    const handleFetchCategory = async () => {
      if (selectedCategoryId) {
        try {
          const data: CategoryDetailsType = await fetchCategoryById(
            selectedCategoryId
          );
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
    const formData = new FormData();
    console.log("დასააპდეითებელი ", selectedCategoryData);
    if (!selectedCategoryId) return;
    formData.append("categoryName", selectedCategoryData.categoryName);

    if (selectedCategoryData.categoryImageFile) {
      formData.append("categoryImage", selectedCategoryData.categoryImageFile);
    }
    const subcategoryImagesMap: Record<number, File> = {};
    const subcategories = selectedCategoryData.subcategories.map(
      (subcat: SubCategoryTypeDTO, index: number) => {
        if (subcat.subcategoryImageFile) {
          subcategoryImagesMap[index] = subcat.subcategoryImageFile;
          return {
            subcategoryName: subcat.subcategoryName,
          };
        }
        return {
          id: subcat.id,
          subcategoryName: subcat.subcategoryName,
        };
      }
    );
    formData.append("subcategories", JSON.stringify(subcategories));
    for (const [index, file] of Object.entries(subcategoryImagesMap)) {
      formData.append(`subcategoryImage_${index}`, file);
    }
    try {
      const response = await updateCategory(selectedCategoryId, formData);
      toast.success(response.message);
      handleToggleEditModal();
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.message) {
          toast.error(error.response?.data.message);
          return;
        }
        toast.error("Something went wrong");
        console.error("Failed to update category:", error);
      }
    }
  };

  const handleDeleteSubCategory = (subcategoryId: number) => {
    const filteredsubcategories = selectedCategoryData?.subcategories.filter(
      (subcategory: SubCategoryTypeDTO) => subcategory.id !== subcategoryId
    ) as SubCategoryTypeDTO[];
    setSelectedCategoryData((prevValues) => {
      return {
        ...prevValues,
        subCategories: filteredsubcategories,
      };
    });
  };

  return (
    <Modal
      className="space-y-4"
      modalTitle="Edit Category"
      onClose={() => handleToggleEditModal()}
    >
      <CategoryForm
        actionName="edit"
        handleDeleteSubCategory={handleDeleteSubCategory}
        selectedCategoryData={selectedCategoryData}
        onSubmit={onSubmit}
        setSelectedCategoryData={setSelectedCategoryData}
      />
    </Modal>
  );
};

export default CategoryEditModal;
