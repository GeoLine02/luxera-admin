"use client";

import Dropdown from "@/components/ui/DropDown";
import { ProductRow } from "@/types/products";
import { EllipsisVertical } from "lucide-react";

interface ProductActionsProps {
  row: ProductRow;
  onDelete: (row: ProductRow) => void;
  onView: (row: ProductRow) => void;
}

const ProductActions = ({ onDelete, onView, row }: ProductActionsProps) => {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <EllipsisVertical color="black" />
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => onView(row)}>View</Dropdown.Item>
        <Dropdown.Item onClick={() => onDelete(row)}>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProductActions;
