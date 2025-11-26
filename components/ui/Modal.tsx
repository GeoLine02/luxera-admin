import { X } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  modalTitle: string;
  className?: string;
}

const Modal = ({ onClose, modalTitle, children, className }: ModalProps) => {
  return (
    <div className="w-full min-h-screen bg-black/70 flex items-center justify-center absolute top-0 left-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={cn(
          className,
          "bg-medium-gray rounded-xl w-full max-w-lg p-4"
        )}
      >
        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">{modalTitle}</h1>
            <X
              className="cursor-pointer"
              onClick={onClose}
              size={30}
              color="white"
            />
          </div>
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;
