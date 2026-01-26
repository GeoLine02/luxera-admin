"use client";

import {
  Control,
  FieldErrors,
  UseFormRegister,
  Controller,
  useWatch,
} from "react-hook-form";
import {
  SubCategoryResponse,
  UpdateCategoryFormValues,
  UpdateSubCategoryFormValues,
} from "@/types/categories";
import { UseFieldArrayAppend, UseFieldArrayRemove } from "react-hook-form";
import Upload from "@/components/ui/Upload";
import { X } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

interface Props {
  control: Control<UpdateCategoryFormValues>;
  register: UseFormRegister<UpdateCategoryFormValues>;
  errors: FieldErrors<UpdateCategoryFormValues>;
  fields: { id?: number }[];
  append: UseFieldArrayAppend<UpdateCategoryFormValues, "subCategories">;
  remove: UseFieldArrayRemove;
  existingImageUrl?: string;
  isLoading?: boolean;
}

const UpdateCategoriesForm = ({
  control,
  register,
  errors,
  fields,
  append,
  remove,
  existingImageUrl,
  isLoading = false,
}: Props) => {
  // Watch all form fields for dynamic validation
  const subCategories = useWatch({
    control,
    name: "subCategories",
  });

  const categoryImage = useWatch({
    control,
    name: "categoryImage",
  });

  // Check if we can add a new subcategory
  const canAdd = (index: number) => {
    const sub = subCategories[index];
    return (
      sub?.subcategoryName?.trim() &&
      (sub?.subcategoryImage || sub?.subcategoryImageUrl)
    );
  };

  // Get preview URL - either new file or existing S3 URL
  const getCategoryImagePreview = () => {
    if (categoryImage instanceof File) {
      return URL.createObjectURL(categoryImage);
    }

    return existingImageUrl;
  };

  const getSubcategoryImagePreview = (sub: UpdateSubCategoryFormValues) => {
    if (sub?.subcategoryImage instanceof File) {
      return URL.createObjectURL(sub.subcategoryImage);
    }
    return sub?.subcategoryImageUrl;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* CATEGORY NAME */}
      <div>
        <Input
          {...register("categoryName", {
            required: "Category name is required",
          })}
          placeholder="Category name"
          variant={errors.categoryName ? "error" : "default"}
          disabled={isLoading}
        />
        {errors.categoryName && (
          <p className="text-sm text-red-500 mt-1">
            {errors.categoryName.message}
          </p>
        )}
      </div>

      <div>
        <Input
          {...register("categoryNameKa", {
            required: "Category name (Georgian) is required",
          })}
          placeholder="Category name (ქართული)"
          variant={errors.categoryNameKa ? "error" : "default"}
          disabled={isLoading}
        />
        {errors.categoryNameKa && (
          <p className="text-sm text-red-500 mt-1">
            {errors.categoryNameKa.message}
          </p>
        )}
      </div>

      {/* CATEGORY IMAGE */}
      <div>
        <label className="block text-sm font-medium mb-2">Category Image</label>

        {/* Show preview of existing or new image */}
        <div className="mb-3">
          {getCategoryImagePreview() && (
            <div className="relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={getCategoryImagePreview() || ""}
                alt="Category preview"
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>

        <Controller
          control={control}
          name="categoryImage"
          rules={{ required: false }} // Allow optional on edit
          render={({ field }) => (
            <Upload
              multiSelect={false}
              files={field.value ? [field.value] : []}
              onChange={(files) => {
                if (files[0]) {
                  field.onChange(files[0]);
                } else {
                  field.onChange(null);
                }
              }}
            />
          )}
        />
        {errors.categoryImage && (
          <p className="text-sm text-red-500 mt-1">
            {errors.categoryImage.message}
          </p>
        )}
      </div>

      {/* SUBCATEGORIES */}
      <div className="space-y-4 border-t pt-6">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Subcategories</h3>
          <span className="text-xs text-gray-500">{fields.length} total</span>
        </div>

        {fields.length === 0 ? (
          <p className="text-sm text-gray-500 py-4">No subcategories yet</p>
        ) : (
          fields.map((field, index) => {
            const nameError = errors.subCategories?.[index]?.subcategoryName;
            const imageError = errors.subCategories?.[index]?.subcategoryImage;
            const isExisting = typeof field.id === "number";

            return (
              <div
                key={field.id}
                className="p-4 border rounded-lg space-y-3 relative bg-gray-50"
              >
                {/* Delete button - allow deletion if more than 1 subcategory */}
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition-colors"
                    aria-label="Delete subcategory"
                    disabled={isLoading}
                  >
                    <X size={20} />
                  </button>
                )}

                {/* Badge showing if existing or new */}
                {isExisting && (
                  <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded w-fit">
                    Existing
                  </div>
                )}

                {/* SUBCATEGORY NAME (EN) */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Subcategory Name
                  </label>
                  <Input
                    {...register(`subCategories.${index}.subcategoryName`, {
                      required: "Subcategory name is required",
                    })}
                    placeholder="Subcategory name"
                    variant={nameError ? "error" : "default"}
                    disabled={isLoading}
                  />
                  {nameError && (
                    <p className="text-sm text-red-500 mt-1">
                      {nameError.message}
                    </p>
                  )}
                </div>

                {/* SUBCATEGORY NAME (KA) */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Subcategory Name (ქართული)
                  </label>
                  <Input
                    {...register(`subCategories.${index}.subcategoryNameKa`, {
                      required: "Subcategory name (Georgian) is required",
                    })}
                    placeholder="ქვე კატეგორიის სახელი"
                    variant={nameError ? "error" : "default"}
                    disabled={isLoading}
                  />
                  {nameError && (
                    <p className="text-sm text-red-500 mt-1">
                      {nameError.message}
                    </p>
                  )}
                </div>

                {/* SUBCATEGORY IMAGE */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Subcategory Image
                  </label>

                  {/* Image preview */}
                  {getSubcategoryImagePreview(subCategories[index]) && (
                    <div className="relative w-full h-32 bg-gray-100 rounded-lg overflow-hidden mb-3">
                      <Image
                        src={
                          getSubcategoryImagePreview(subCategories[index]) || ""
                        }
                        alt="Subcategory preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <Controller
                    control={control}
                    name={`subCategories.${index}.subcategoryImage`}
                    rules={{ required: false }} // Allow optional on edit
                    render={({ field }) => (
                      <Upload
                        multiSelect={false}
                        files={field.value ? [field.value] : []}
                        onChange={(files) => {
                          if (files[0]) {
                            field.onChange(files[0]);
                          } else {
                            field.onChange(null);
                          }
                        }}
                      />
                    )}
                  />

                  {imageError && (
                    <p className="text-sm text-red-500 mt-1">
                      {imageError.message}
                    </p>
                  )}
                </div>

                {/* Add new subcategory button - only on last item */}
                {index === fields.length - 1 && (
                  <Button
                    type="button"
                    onClick={() => {
                      if (!canAdd(index)) return;
                      append({
                        subcategoryName: "",
                        subcategoryImage: null,
                        subcategoryNameKa: "",
                        subcategoryImageUrl: undefined,
                      });
                    }}
                    disabled={!canAdd(index) || isLoading}
                  >
                    + Add Subcategory
                  </Button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default UpdateCategoriesForm;
