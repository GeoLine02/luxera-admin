"use client";

import Modal from "@/components/ui/Modal";
import { CategoryWithSubcategories, SubCategoryType } from "@/types/categories";
import { FormEvent, useEffect, useEffectEvent } from "react";
import { fetchCategoryById } from "../services/categories";
import CategoryForm from "./CategoryForm";

interface CategoryEditModalProps {
  handleToggleEditModal: (categoryId?: number) => void;
  handleEditCategory: (e: FormEvent<HTMLFormElement>) => void;
  handleSelectCategoryData: (categoryData: CategoryWithSubcategories) => void;
  selectedCategoryId: number | null;
  selectedCategoryData: CategoryWithSubcategories;
  setSelectedCategoryData: React.Dispatch<
    React.SetStateAction<CategoryWithSubcategories>
  >;
}

const CategoryEditModal = ({
  handleToggleEditModal,
  handleSelectCategoryData,
  selectedCategoryId,
  selectedCategoryData,
  setSelectedCategoryData,
}: CategoryEditModalProps) => {
  const onFetchData = useEffectEvent(() => {
    const handleFetchCategory = async () => {
      if (selectedCategoryId) {
        const res = await fetchCategoryById(selectedCategoryId);
        handleSelectCategoryData(res);
      }
    };

    handleFetchCategory();
  });

  useEffect(() => {
    onFetchData();
  }, []);

  const onSubmit = () => {};

  const handleDeleteSubCategory = (subcategoryId: number) => {
    const filteredsubcategories = selectedCategoryData?.subCategories.filter(
      (subcategory) => subcategory.id !== subcategoryId
    ) as SubCategoryType[];
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
