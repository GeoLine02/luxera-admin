"use client";

import { useEffect, useState, useCallback } from "react";
import Modal from "@/components/ui/Modal";
import { useForm, useFieldArray } from "react-hook-form";
import {
  UpdateCategoryFormValues,
  CategoryResponse,
  SubCategoryResponse,
} from "@/types/categories";
import { fetchCategoryById, updateCategory } from "../services/categories";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import UpdateCategoriesForm from "./UpdateCategoriesForm";
import { v4 } from "uuid";

interface CategoryEditModalProps {
  categoryId: number;
  handleToggleEditModal: (id: number | undefined) => void;
  onSuccess?: () => void; // Callback to refresh parent data
}

const CategoryEditModal = ({
  categoryId,
  handleToggleEditModal,
  onSuccess,
}: CategoryEditModalProps) => {
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [categoryData, setCategoryData] = useState<CategoryResponse | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    reset,
    watch,
  } = useForm<UpdateCategoryFormValues>({
    defaultValues: {
      categoryName: "",
      categoryNameKa: "",
      categoryImage: null,
      categoryImageS3Key: undefined,
      subCategories: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subCategories",
  });

  // Fetch category data on mount
  useEffect(() => {
    const loadCategoryData = async () => {
      try {
        setIsLoadingData(true);
        setError(null);

        const response = await fetchCategoryById(categoryId);
        setCategoryData(response.data);

        // Transform API response to form values
        const formValues: UpdateCategoryFormValues = {
          categoryName: response.data.category_name,
          categoryNameKa: response.data.category_name_ka,
          categoryImage: null, // Files can't be set as default
          categoryImageS3Key: response.data.category_image_s3_key,
          subCategories: response.data.subCategories.map(
            (sub: SubCategoryResponse) => ({
              id: sub.id, // Store DB ID to differentiate from new items
              subcategoryName: sub.sub_category_name,
              subcategoryNameKa: sub.sub_category_name_ka,
              subcategoryImage: null, // Files can't be set as default
              subcategoryImageUrl: sub.imageUrl,
              subcategoryImageS3Key: sub.subcategory_image_s3_key,
            }),
          ),
        };

        reset(formValues);
      } catch (err) {
        const message =
          err instanceof AxiosError
            ? err.response?.data?.message || "Failed to load category"
            : "Failed to load category";
        setError(message);
        console.error(err);
        toast.error(message);
      } finally {
        setIsLoadingData(false);
      }
    };

    if (categoryId) {
      loadCategoryData();
    }
  }, [categoryId, reset]);

  // Handle form submission with proper change detection
  const onSubmit = async (data: UpdateCategoryFormValues) => {
    try {
      // Build FormData only with changed fields
      const formData = new FormData();

      // Add category fields
      formData.append("categoryName", data.categoryName);
      formData.append("categoryNameKa", data.categoryNameKa);

      // Only add image if it changed
      if (data.categoryImage instanceof File) {
        formData.append("categoryImage", data.categoryImage);
      }

      // Process subcategories - differentiate between new and existing
      const subcategories = data.subCategories.map((sub) => {
        let id: string | number;
        let isNew: boolean;
        if (sub.id) {
          id = sub.id;
          isNew = false;
        } else {
          id = v4();
          isNew = true;
        }
        const payload = {
          id: id,
          isNew: isNew,
          subcategoryName: sub.subcategoryName,
          subcategoryNameKa: sub.subcategoryNameKa,
        };

        // Handle subcategory images
        if (sub.subcategoryImage instanceof File) {
          // New image uploaded
          formData.append(`subcategoryImage_${id}`, sub.subcategoryImage);
        }

        return payload;
      });
      console.log("დასააპდეითებელი დატა", {
        subcategories,
        categoryName: data.categoryName,
        categoryNameKa: data.categoryNameKa,
      });

      formData.append("subcategories", JSON.stringify(subcategories));

      // API call to update
      const res = await updateCategory(categoryId, formData);
      toast.success(res.message || "Category updated successfully");

      // Reset form and close modal
      reset();
      handleToggleEditModal(undefined);

      // Call parent callback to refresh data
      onSuccess?.();
    } catch (error) {
      const message =
        error instanceof AxiosError
          ? error.response?.data?.message || "Failed to update category"
          : "Failed to update category";
      toast.error(message);
      console.error("Update error:", error);
    }
  };

  // Handle modal close with unsaved changes warning
  const handleClose = () => {
    if (isDirty) {
      if (
        confirm("You have unsaved changes. Are you sure you want to close?")
      ) {
        handleToggleEditModal(undefined);
      }
    } else {
      handleToggleEditModal(undefined);
    }
  };

  return (
    <Modal modalTitle="Edit Category" onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {error && !isLoadingData && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-700">{error}</p>
            <button
              type="button"
              onClick={() => setError(null)}
              className="text-xs text-red-600 hover:text-red-800 mt-2"
            >
              Dismiss
            </button>
          </div>
        )}

        <UpdateCategoriesForm
          control={control}
          register={register}
          errors={errors}
          fields={fields}
          append={append}
          remove={remove}
          existingImageUrl={categoryData?.imageUrl}
          isLoading={isLoadingData}
        />

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 rounded-md border border-gray-300 py-2 text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50"
            disabled={isSubmitting || isLoadingData}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || isLoadingData || !isDirty}
            className="flex-1 rounded-md bg-green-600 py-2 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700"
          >
            {isSubmitting ? "Saving..." : "Update Category"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CategoryEditModal;
