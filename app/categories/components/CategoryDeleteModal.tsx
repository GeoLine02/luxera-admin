import { Button } from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";

interface CategoryDeleteModalProps {
  handleCloseDeleteModal: () => void;
  handleDeleteCategory: () => void;
}

const CategoryDeleteModal = ({
  handleCloseDeleteModal,
}: CategoryDeleteModalProps) => {
  return (
    <Modal modalTitle="Delete Category" onClose={handleCloseDeleteModal}>
      <h1 className="text-lg font-medium">
        Are you sure you want to delete this category? <br /> This change will
        be permament.
      </h1>
      <div className="flex justify-end gap-2">
        <Button className="hover:bg-red-500 px-9" variant={"default"}>
          Delete
        </Button>
        <Button className="px-9" variant={"default"}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default CategoryDeleteModal;
