import { Dispatch, SetStateAction } from "react";

interface ProductRejectMesssageProps {
  rejectMessage: string;
  setRejectMessage: Dispatch<SetStateAction<string>>;
}

const ProductRejectMesssage = ({
  rejectMessage,
  setRejectMessage,
}: ProductRejectMesssageProps) => {
  return (
    <div className="mt-6">
      <label className="block font-medium text-gray-700 mb-1">
        Rejection Message
      </label>
      <textarea
        value={rejectMessage}
        onChange={(e) => setRejectMessage(e.target.value)}
        placeholder="Explain why this product is rejected..."
        className="w-full min-h-[120px] border border-gray-300 rounded-md p-3 text-black focus:outline-none focus:ring-2 focus:ring-red-400"
      />
    </div>
  );
};

export default ProductRejectMesssage;
