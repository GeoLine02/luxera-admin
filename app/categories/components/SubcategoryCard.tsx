"use client";
import { X } from "lucide-react";

interface SubCategoryCardProps {
  id?: number;
  subCategoryName: string;
  handleDeleteSubcategory: (categoryId: number) => void;
}

const SubCategoryCard = ({
  id,
  subCategoryName,
  handleDeleteSubcategory,
}: SubCategoryCardProps) => {
  const handleDelete = () => {
    if (id !== undefined) {
      handleDeleteSubcategory(id);
    }
  };

  return (
    <div className="border-white border-2 rounded-full flex items-center gap-2 p-1 px-2">
      <h1 className="font-medium">{subCategoryName}</h1>
      <span>
        <X onClick={handleDelete} size={15} className="cursor-pointer" />
      </span>
    </div>
  );
};
export default SubCategoryCard;
