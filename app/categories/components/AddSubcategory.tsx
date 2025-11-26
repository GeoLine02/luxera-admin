"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { ChangeEvent, useState } from "react";
import { CategoryWithSubcategories, SubCategoryType } from "@/types/categories";
import { InputImage } from "@/components/ui/ImageDrop";

interface AddSubcategoryProps {
  selectedCategoryData: { subCategories: SubCategoryType[]; id: number } | null;
  setSelectedCategoryData: React.Dispatch<
    React.SetStateAction<CategoryWithSubcategories>
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

    const exists = selectedCategoryData.subCategories.some(
      (sub) => sub.subCategoryName === inputValue.trim()
    );
    if (exists) return;

    const newSubcategory: SubCategoryType = {
      id:
        Math.max(0, ...selectedCategoryData.subCategories.map((s) => s.id)) + 1,
      subCategoryName: inputValue.trim(),
      subCategoryImage: localImageFile,
      categoryId: selectedCategoryData.id,
    };

    setSelectedCategoryData((prev) =>
      prev
        ? {
            ...prev,
            subCategories: [...prev.subCategories, newSubcategory],
          }
        : prev
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
