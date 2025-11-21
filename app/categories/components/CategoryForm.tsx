"use client";

import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { CategoryWithSubcategories } from "@/types/categories";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import { SubCategoriesList } from "./SubCategoriesList";
import AddSubcategory from "./AddSubcategory";
import { Button } from "@/components/ui/Button";
import Upload from "@/components/ui/Upload";

interface CategoryFormProps {
  actionName: "create" | "edit";
  setSelectedCategoryData: Dispatch<SetStateAction<CategoryWithSubcategories>>;
  selectedCategoryData: CategoryWithSubcategories;
  handleDeleteSubCategory: (categoryId: number) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const CategoryForm = ({
  actionName,
  setSelectedCategoryData,
  selectedCategoryData,
  handleDeleteSubCategory,
  onSubmit,
}: CategoryFormProps) => {
  const isEdit = actionName === "edit";

  const onCategoryInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedCategoryData((prev) => {
      return { ...prev, categoryName: e.target.value };
    });
  };

  const onCategoryFileChange = (files: File[]) => {
    setSelectedCategoryData((prev) => ({
      ...prev,
      categoryImageFile: files[0] ?? null,
    }));
  };

  const onCategoryImageUrlRemove = () => {
    setSelectedCategoryData((prev) => ({
      ...prev,
      categoryImage: "",
    }));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="mt-4">
        <Label variant="default" size="sm" className="text-white/80 mb-1">
          Category Name
        </Label>

        <Input
          variant="default"
          placeholder="Enter Category Name"
          name="categoryName"
          value={selectedCategoryData?.categoryName}
          onChange={onCategoryInputChange}
        />
      </div>

      <Upload
        fileUrls={selectedCategoryData.categoryImage} // url or []
        files={
          selectedCategoryData.categoryImageFile
            ? [selectedCategoryData.categoryImageFile]
            : []
        }
        multiSelect={false}
        onChange={onCategoryFileChange}
        onRemoveUrl={onCategoryImageUrlRemove}
      />

      {/* SUBCATEGORIES */}
      {selectedCategoryData?.subCategories && (
        <SubCategoriesList
          handleDeleteSubCategory={handleDeleteSubCategory}
          subCategories={selectedCategoryData.subCategories}
        />
      )}

      <AddSubcategory
        selectedCategoryData={selectedCategoryData}
        setSelectedCategoryData={setSelectedCategoryData}
      />

      <div className="w-full p-4 flex justify-end bg-dark-gray">
        <Button className="px-9" type="submit" variant="default">
          {isEdit ? "Save Changes" : "Create"}
        </Button>
      </div>
    </form>
  );
};

export default CategoryForm;
