"use client";

import Modal from "@/components/ui/Modal";
import { useForm, useFieldArray } from "react-hook-form";
import { CreateCategoryFormValues } from "@/types/categories";
import CategoriesForm from "./CategoriesForm";
import { createCategory } from "../services/categories";

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
      categoryImage: null,
      subCategories: [
        {
          subcategoryName: "",
          subcategoryImage: null,
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

      if (data.categoryImage) {
        formData.append("categoryImage", data.categoryImage);
      }

      data.subCategories.forEach((sub, index) => {
        formData.append(
          `subCategories[${index}][subcategoryName]`,
          sub.subcategoryName,
        );

        if (sub.subcategoryImage) {
          formData.append(
            `subCategories[${index}][subcategoryImage]`,
            sub.subcategoryImage,
          );
        }
      });

      // API call
      await createCategory(formData);

      // Reset and close modal
      reset();
      handleToggleCreateModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal modalTitle="Create Category" onClose={handleToggleCreateModal}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <CategoriesForm
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
