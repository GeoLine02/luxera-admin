"use client";

import Modal from "@/components/ui/Modal";
import { useForm, useFieldArray } from "react-hook-form";
import { CreateCategoryFormValues } from "@/types/categories";
import { createCategory } from "../services/categories";
import { v4 } from "uuid";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import CreateCategoriesForm from "./CreateCategoriesForm";
interface CategoryCreateModalProps {
  handleToggleCreateModal: () => void;
}

const CategoryCreateModal = ({
  handleToggleCreateModal,
}: CategoryCreateModalProps) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateCategoryFormValues>({
    defaultValues: {
      categoryName: "",
      categoryNameKa: "",
      categoryImage: null,
      subCategories: [
        {
          subcategoryName: "",
          subcategoryImage: null,
          subcategoryNameKa: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subCategories",
  });

  const onSubmit = async (data: CreateCategoryFormValues) => {
    try {
      const formData = new FormData();

      formData.append("categoryName", data.categoryName);
      formData.append("categoryNameKa", data.categoryNameKa);
      if (data.categoryImage) {
        formData.append("categoryImage", data.categoryImage);
      }
      const subcategories = data.subCategories.map((sub) => {
        const tempId = v4();

        if (sub.subcategoryImage) {
          formData.append(`subcategoryImage_${tempId}`, sub.subcategoryImage);
        }
        return {
          tempId: tempId,
          subcategoryName: sub.subcategoryName,
          subcategoryNameKa: sub.subcategoryNameKa,
        };
      });
      formData.append("subcategories", JSON.stringify(subcategories));

      // API call
      const res = await createCategory(formData);
      toast.success(res.message);

      // Reset and close modal
      reset();
      handleToggleCreateModal();
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.message;
        toast.error(message);
      }
      console.log(error);
    }
  };

  return (
    <Modal modalTitle="Create Category" onClose={handleToggleCreateModal}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <CreateCategoriesForm
          control={control}
          register={register}
          errors={errors}
          fields={fields}
          append={append}
          remove={remove}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-green-600 py-2 text-white disabled:opacity-50"
        >
          Create Category
        </button>
      </form>
    </Modal>
  );
};

export default CategoryCreateModal;
