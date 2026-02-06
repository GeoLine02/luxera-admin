import Dropdown from "@/components/ui/DropDown";
import { ShopRow } from "@/types/shops";
import { EllipsisVertical } from "lucide-react";

interface ShopActiontsProps {
  row: ShopRow;
  onView: (row: ShopRow) => void;
  onDelete: (row: ShopRow) => void;
}

const ShopActionts = ({ onDelete, onView, row }: ShopActiontsProps) => {
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

export default ShopActionts;
