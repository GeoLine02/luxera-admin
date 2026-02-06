"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { fetchShopById } from "../services/shop";
import { ShopRow } from "@/types/shops";

interface ViewShopModalProps {
  shopId: number;
  onClose: () => void;
  setShops: Dispatch<SetStateAction<ShopRow[]>>;
}

const ViewShopModal = ({ shopId, onClose, setShops }: ViewShopModalProps) => {
  const [shop, setShop] = useState<ShopRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleFetchShop = async () => {
      const res = await fetchShopById(shopId);
      setShop(res.data);
      setLoading(false);
    };

    handleFetchShop();
  }, [shopId]);

  console.log("Shop data:", shop);

  const handleApproveShop = async () => {
    try {
      // TODO: Implement approve shop service
      console.log("Approve shop:", shopId);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRejectShop = async () => {
    try {
      // TODO: Implement reject shop service
      console.log("Reject shop:", shopId);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
        <div className="bg-white rounded-lg p-6">
          <p className="text-black">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-white w-full max-w-4xl rounded-lg p-6 relative overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-black">View Shop</h1>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <X size={25} />
          </button>
        </div>

        {/* Shop Information */}
        <div className="mt-6 space-y-6">
          {/* ID */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">ID</label>
            <p className="border border-gray-200 rounded-md p-3 bg-gray-50 text-black">
              {shop?.id || "N/A"}
            </p>
          </div>

          {/* Shop Name */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Shop Name
            </label>
            <p className="border border-gray-200 rounded-md p-3 bg-gray-50 text-black">
              {shop?.shop_name || "N/A"}
            </p>
          </div>

          {/* Owner ID */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Owner ID
            </label>
            <p className="border border-gray-200 rounded-md p-3 bg-gray-50 text-black">
              {shop?.owner_id || "N/A"}
            </p>
          </div>

          {/* City */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">City</label>
            <p className="border border-gray-200 rounded-md p-3 bg-gray-50 text-black">
              {shop?.city || "N/A"}
            </p>
          </div>

          {/* Created At */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Created At
            </label>
            <p className="border border-gray-200 rounded-md p-3 bg-gray-50 text-black">
              {shop?.createdAt || "N/A"}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end mt-8">
            <Button onClick={onClose} variant="default">
              Close
            </Button>
            <Button
              onClick={handleApproveShop}
              variant="default"
              className="bg-green-600 hover:bg-green-700"
            >
              Approve
            </Button>
            <Button
              onClick={handleRejectShop}
              variant="default"
              className="bg-red-600 hover:bg-red-700"
            >
              Reject
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewShopModal;
