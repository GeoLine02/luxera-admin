"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { ChangeEvent, useState } from "react";
import { CategoryWithSubcategories, SubCategoryType } from "@/types/categories";

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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAdd = () => {
    if (!inputValue.trim() || !selectedCategoryData) return;

    // check for duplicates
    const exists = selectedCategoryData.subCategories.some(
      (sub) => sub.subCategoryName === inputValue.trim()
    );
    if (exists) return;

    const newSubcategory: SubCategoryType = {
      id:
        Math.max(0, ...selectedCategoryData.subCategories.map((s) => s.id)) + 1, // temporary numeric ID
      subCategoryName: inputValue.trim(),
      subCategoryImage: "", // default
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

    setInputValue(""); // clear input
  };

  return (
    <div className="flex items-end gap-2 w-full">
      <div className="w-full">
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
      <Button className="px-9" variant="default" onClick={handleAdd}>
        Add
      </Button>
    </div>
  );
};

export default AddSubcategory;
