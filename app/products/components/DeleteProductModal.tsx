"use client";

import { Button } from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { deleteProduct } from "../services/products";
import { ProductRow } from "@/types/products";

interface DeleteProductModalProps {
  onCloseDeleteModal: () => void;
  selectedProductId: number;
  products: ProductRow[];
}

const DeleteProductModal = ({
  onCloseDeleteModal,
  selectedProductId,
  products,
}: DeleteProductModalProps) => {
  const handleDeleteProductModal = async () => {
    const res = await deleteProduct(selectedProductId);
    console.log(res);
  };

  return (
    <Modal
      className="space-y-2"
      modalTitle="Delete Product"
      onClose={onCloseDeleteModal}
    >
      <h1>
        Are you sure you want to delete this product? <br /> This change is
        permanent!
      </h1>
      <div className="flex gap-4 items-end">
        <Button
          className="mt-4"
          onClick={onCloseDeleteModal}
          variant={"default"}
        >
          Close
        </Button>
        <Button
          className="hover:bg-red-500"
          onClick={handleDeleteProductModal}
          variant={"default"}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteProductModal;
