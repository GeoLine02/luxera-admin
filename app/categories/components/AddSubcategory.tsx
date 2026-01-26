"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { ChangeEvent, useState } from "react";
import {
  CategoryWithSubcategoriesDTO,
  SubCategoryTypeDTO,
} from "@/types/categories";
import { InputImage } from "@/components/ui/ImageDrop";
import { v4 } from "uuid";
interface AddSubcategoryProps {
  selectedCategoryData: CategoryWithSubcategoriesDTO;
  setSelectedCategoryData: React.Dispatch<
    React.SetStateAction<CategoryWithSubcategoriesDTO>
  >;
}

const AddSubcategory = ({
  selectedCategoryData,
  setSelectedCategoryData,
}: AddSubcategoryProps) => {
  const [inputValue, setInputValue] = useState("");
  const [localImageFile, setLocalImageFile] = useState<File | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setLocalImageFile(file);
  };

  const handleAdd = () => {
    if (!inputValue.trim() || !selectedCategoryData) return;

    const exists = selectedCategoryData.subcategories.some(
      (sub) => sub.subcategoryName === inputValue.trim(),
    );
    if (exists) return;
    if (!localImageFile) return;

    const newSubcategory: SubCategoryTypeDTO = {
      id: v4(),
      subcategoryName: inputValue.trim(),
      subcategoryImageFile: localImageFile,
      categoryId: selectedCategoryData.id,
      isNew: true,
    };

    setSelectedCategoryData((prev) =>
      prev
        ? {
            ...prev,
            subcategories: [...prev.subcategories, newSubcategory],
          }
        : prev,
    );

    setInputValue("");
    setLocalImageFile(null);
  };

  return (
    <div className="flex items-end gap-2 w-full">
      <div className="w-1/2 flex-col">
        <Label size="sm" variant="default" className="text-white mb-1">
          Subcategory name
        </Label>
        <Input
          variant="default"
          placeholder="Add subcategory"
          className="w-full"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>

      <div className="w-1/2 flex-col">
        <Label size="sm" variant="default" className="text-white mb-1">
          Image
        </Label>
        <InputImage
          variant="default"
          placeholder="Select Image"
          name="subCategoryImage"
          onChange={handleImageChange}
          value={localImageFile ? undefined : ""}
        />
      </div>

      <Button className="px-9" variant="default" onClick={handleAdd}>
        Add
      </Button>
    </div>
  );
};

export default AddSubcategory;
