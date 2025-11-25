"use client";

import Modal from "@/components/ui/Modal";
import CategoryForm from "./CategoryForm";
import { CategoryWithSubcategories } from "@/types/categories";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { fetchPostCategory } from "../services/categories";
import { CloudFog } from "lucide-react";

interface AddCategoryModalProps {
  handleToggleCreateModal: (categoryId?: number) => void;
  handleDeleteSubCategory: (categoryId: number) => void;
  handleSelectCategoryData: (categoryData: CategoryWithSubcategories) => void;
  selectedCategoryData: CategoryWithSubcategories;
  selectedCategoryId: number | null;
  setSelectedCategoryData: Dispatch<SetStateAction<CategoryWithSubcategories>>;
}

const CategoryCreateModal = ({
  handleToggleCreateModal,
  handleDeleteSubCategory,
  selectedCategoryData,
  setSelectedCategoryData,
}: AddCategoryModalProps) => {
const onCreate = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  console.log(selectedCategoryData);

  try {
    const res = await fetchPostCategory(selectedCategoryData);
    console.log(res);
  } catch (err) {
    console.log(err);
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
        handleDeleteSubCategory={handleDeleteSubCategory}
        onSubmit={onCreate}
        actionName="create"
      />
    </Modal>
  );
};

export default CategoryCreateModal;
