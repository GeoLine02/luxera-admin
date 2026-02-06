"use client";

import { Button } from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { deleteShopById } from "../services/shop";
import { ShopRow } from "@/types/shops";

interface DeleteShopModalProps {
  onCloseDeleteModal: () => void;
  selectedShopId: number;
  shops: ShopRow[];
  setShops: React.Dispatch<React.SetStateAction<ShopRow[]>>;
}

const DeleteShopModal = ({
  onCloseDeleteModal,
  selectedShopId,
  shops,
  setShops,
}: DeleteShopModalProps) => {
  const handleDeleteShop = async () => {
    // TODO: Implement delete shop service
    const res = await deleteShopById(selectedShopId);

    if (res?.status === 200) {
      const updatedShops = shops.filter((shop) => shop.id !== selectedShopId);
      setShops(updatedShops);
    }
    console.log("Delete shop:", selectedShopId);
    onCloseDeleteModal();
  };

  return (
    <Modal
      className="space-y-2"
      modalTitle="Delete Shop"
      onClose={onCloseDeleteModal}
    >
      <h1>
        Are you sure you want to delete this shop? <br /> This change is
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
          onClick={handleDeleteShop}
          variant={"default"}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteShopModal;
