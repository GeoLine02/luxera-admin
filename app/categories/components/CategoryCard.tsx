"use client";

import { Button } from "@/components/ui/Button";

interface CategoryCardProps {
  id: number;
  categoryName: string;
  categoryImage: string;
  handleToggleDeleteModal: (categoryId: number) => void;
  handleToggleEditModal: (categoryId: number) => void;
}

const CategoryCard = ({
  id,
  categoryName,
  handleToggleDeleteModal,
  handleToggleEditModal,
  categoryImage,
}: CategoryCardProps) => {
  return (
    <div className="flex items-center justify-between w-full max-w-[49%] bg-medium-gray p-2 rounded-md">
      <div className="flex items-center gap-2">
        <div className="w-14 aspect-square rounded-md bg-gray-500">
          <img
            src={categoryImage || placeHolderImage}
            className="object-cover w-full h-full"
            alt="categoryimage"
            width={100}
            height={100}
          />
        </div>
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
export default CategoryCard;
