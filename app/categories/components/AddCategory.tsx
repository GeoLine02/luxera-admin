import { Plus } from "lucide-react";

interface AddCategoryProps {
  handleToggleCreateModal: () => void;
}

const AddCategory = ({ handleToggleCreateModal }: AddCategoryProps) => {
  return (
    <div
      onClick={handleToggleCreateModal}
      className="w-full max-w-full md:max-w-[49%] flex items-center justify-center border-2 border-dashed bg-medium-gray p-2 cursor-pointer rounded-lg"
    >
      <Plus size={45} color="white" />
    </div>
  );
};

export default AddCategory;
