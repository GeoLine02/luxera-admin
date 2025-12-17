"use client";

import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  CategoryTypeDTO,
  CategoryWithSubcategoriesDTO,
} from "@/types/categories";
import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import { SubCategoriesList } from "./SubCategoriesList";
import AddSubcategory from "./AddSubcategory";
import { Button } from "@/components/ui/Button";
import { InputImage } from "@/components/ui/ImageDrop";

interface CategoryFormProps {
  actionName: "create" | "edit";
  setSelectedCategoryData: Dispatch<
    SetStateAction<CategoryWithSubcategoriesDTO>
  >;
  selectedCategoryData: CategoryWithSubcategoriesDTO;
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
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState<string | null>(
    null
  );
  console.log("selectedCategoryData: ", selectedCategoryData);

  const onCategoryInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedCategoryData((prev) => {
      return { ...prev, categoryName: e.target.value };
    });
  };

  const onCategoryInputImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    const selectedFile = files && files.length > 0 ? files[0] : null;

    setSelectedCategoryData((prev: CategoryWithSubcategoriesDTO) => ({
      ...prev,
      categoryImageFile: selectedFile,
    }));

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };

      reader.readAsDataURL(selectedFile);
    } else {
      setImagePreviewUrl(null);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="mt-4">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
              <Label variant="default" size="sm" className="text-white/80 mb-1">
                Category image
              </Label>

              <div className="w-full h-40 border-dashed border-2 border-gray-500 rounded-xl flex items-center justify-center overflow-hidden">
                {(() => {
                  // Preview takes precedence (new upload), fallback to existing category image
                  const displayUrl =
                    imagePreviewUrl || selectedCategoryData?.categoryImageUrl;

                  if (!displayUrl) {
                    return (
                      <span className="text-gray-400">No Image Selected</span>
                    );
                  }

                  return (
                    <img
                      src={displayUrl}
                      alt={
                        imagePreviewUrl
                          ? "New Category Preview"
                          : "Current Category Image"
                      }
                      className="object-contain w-full h-full"
                      onError={(e) => {
                        // Handle broken images gracefully
                        e.currentTarget.style.display = "none";
                        e.currentTarget.parentElement
                          ?.querySelector(".fallback-text")
                          ?.classList.remove("hidden");
                      }}
                    />
                  );
                })()}
                <span className="text-gray-400 fallback-text hidden">
                  Failed to load image
                </span>
              </div>

              <InputImage
                variant="default"
                name="categoryImage"
                onChange={onCategoryInputImageChange}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Label variant="default" size="sm" className="text-white/80 mb-1">
              Category Name
            </Label>
            <Input
              variant="default"
              placeholder="Enter Category Name"
              name="categoryName"
              value={selectedCategoryData?.categoryName || ""}
              onChange={onCategoryInputChange}
            />
          </div>
        </div>
      </div>

      {/* SUBCATEGORIES */}
      {selectedCategoryData?.subcategories && (
        <SubCategoriesList
          handleDeleteSubCategory={handleDeleteSubCategory}
          subCategories={selectedCategoryData.subcategories}
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
