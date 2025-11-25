"use client";

import { Button } from "@/components/ui/Button";
import { CategoryType, CategoryWithSubcategories } from "@/types/categories";
import { FormEvent, useState } from "react";
import CategoryEditModal from "./CategoryEditModal";
import CategoryDeleteModal from "./CategoryDeleteModal";
import AddCategory from "./AddCategory";
import CategoryCreateModal from "./CategoryCreateModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { OpenCreateModal, OpenDeleteModal, OpenEditModal } from "@/app/store/features/IsOpenBoolean";

interface CategoryCardProps {
  id: number | undefined;
  categoryName: string;
  categoryImage: string;
  handleToggleDeleteModal: (categoryId: number | undefined) => void;
  handleToggleEditModal: (categoryId: number | undefined) => void;
}

export function generateUniqueNumericId(): number {
  const timestamp = Date.now(); 

  const randomFactor = Math.floor(Math.random() * 100); 
  const numericString = `${timestamp}${randomFactor.toString().padStart(2, '0')}`;
  
  return Number(numericString);
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

  const Dispatch = useDispatch<AppDispatch>();
  const {isCreateModalOpen, isDeleteModalOpen, isEditModalOpen} = useSelector((state: RootState) => state.IsOpenModals)

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  const [selectedCategoryData, setSelectedCategoryData] =
    useState<CategoryWithSubcategories>({
      categoryImage: "",
      categoryName: "",
      id: generateUniqueNumericId(),
      subCategories: [],
      // categoryImageFile: null,
    });

  const handleToggleEditModal = (categoryId?: number) => {
    Dispatch(OpenEditModal());
    setSelectedCategoryId(categoryId ?? null);
    if (isEditModalOpen)
      setSelectedCategoryData({
        categoryImage: "",
        categoryName: "",
        id: categoryId,
        subCategories: [],
      });
  };
  
  console.log("selectedCategoryData", selectedCategoryData);

  const handleToggleDeleteModal = (categoryId?: number) => {
    Dispatch(OpenDeleteModal());
    setSelectedCategoryId(categoryId ?? null);
  };

  const handleToggleCreateModal = () => {
    Dispatch(OpenCreateModal());
    if (isCreateModalOpen)
      setSelectedCategoryData({
        categoryImage: "",
        categoryName: "",
        id: 0,
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
      {categories?.map &&
        categories.map((category) => (
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
