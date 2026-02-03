import { ProductType, ProductVariantType } from "@/types/products";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchProductById } from "../services/products";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ViewProductModalProps {
  productId: number;
  onClose: () => void;
}

const ViewProductModal = ({ productId, onClose }: ViewProductModalProps) => {
  const [product, setProduct] = useState<ProductType | null>(null);

  useEffect(() => {
    const handleFetchProduct = async () => {
      const res = await fetchProductById(productId);

      setProduct(res);
    };
    handleFetchProduct();
  }, [productId]);

  console.log(product);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 bg-opacity-50">
      <div className="bg-white w-full max-w-4xl rounded-lg p-6 relative overflow-y-auto max-h-[90vh]">
        {/* Close Button */}

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-black">View Product</h1>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-lg font-bold"
          >
            <X size={25} />
          </button>
        </div>

        {/* Description */}
        <div className="mb-6 mt-3">
          <label className="block font-medium text-gray-700 mb-1">
            Description
          </label>
          <p className="border border-gray-200 rounded-md p-3 bg-gray-50 text-black">
            {product?.product_description}
          </p>
        </div>

        {/* Product Variants */}
        <div>
          <h3 className="font-medium text-lg mb-3 text-black">
            Product Variants
          </h3>
          {product?.variants.map((variant: ProductVariantType) => (
            <div
              key={variant.id}
              className="border border-gray-200 rounded-md p-4 mb-4 bg-gray-50"
            >
              <div className="mb-2">
                <label className="block font-medium text-gray-700">
                  Variant Name
                </label>
                <p className="p-2 border border-gray-300 rounded text-black">
                  {variant.variant_name}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-2">
                <div>
                  <label className="block font-medium text-gray-700">
                    Price
                  </label>
                  <p className="p-2 border border-gray-300 rounded text-black">
                    ${variant.variant_price}
                  </p>
                </div>
                <div>
                  <label className="block font-medium text-gray-700">
                    Quantity
                  </label>
                  <p className="p-2 border border-gray-300 rounded text-black">
                    {variant.variant_quantity}
                  </p>
                </div>
                <div>
                  <label className="block font-medium text-gray-700">
                    Discount %
                  </label>
                  <p className="p-2 border border-gray-300 rounded text-black">
                    {variant.variant_discount}%
                  </p>
                </div>
              </div>

              {/* Variant Images */}
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Variant Images
                </label>
                <div className="flex gap-2 flex-wrap">
                  {variant.images.length > 0 ? (
                    variant.images.map((img, idx) => (
                      <div
                        key={idx}
                        className="w-24 h-24 border border-gray-300 rounded overflow-hidden relative"
                      >
                        <Image
                          src={img.imageUrl}
                          alt={variant.variant_name}
                          className="object-cover"
                          width={200}
                          height={200}
                        />
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 italic">No images uploaded</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Close Button */}
        <div className="flex gap-4 justify-end mt-4">
          <Button className="bg-green-500 text-white px-6 py-2 rounded-md flex gap-2 items-center hover:bg-green-700">
            <Check />
            Approve
          </Button>
          <Button className="bg-red-500 text-white px-6 flex gap-2 items-center py-2 rounded-md hover:bg-red-700">
            <X />
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewProductModal;
