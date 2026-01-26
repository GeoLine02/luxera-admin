"use client";

import {
  Control,
  FieldErrors,
  UseFormRegister,
  Controller,
  useWatch,
} from "react-hook-form";
import { CreateCategoryFormValues } from "@/types/categories";
import { UseFieldArrayAppend, UseFieldArrayRemove } from "react-hook-form";
import Upload from "@/components/ui/Upload";
import { X } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface Props {
  control: Control<CreateCategoryFormValues>;
  register: UseFormRegister<CreateCategoryFormValues>;
  errors: FieldErrors<CreateCategoryFormValues>;
  fields: { id: string }[];
  append: UseFieldArrayAppend<CreateCategoryFormValues, "subCategories">;
  remove: UseFieldArrayRemove;
}

const CreateCategoriesForm = ({
  control,
  register,
  errors,
  fields,
  append,
  remove,
}: Props) => {
  // Watch subcategories
  const subCategories = useWatch({
    control,
    name: "subCategories",
  });

  const canAdd = (index: number) => {
    const sub = subCategories[index];
    return sub?.subcategoryName?.trim() && sub?.subcategoryImage;
  };

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
            required: "Category name is required",
          })}
          placeholder="Category name Ka"
          variant={errors.categoryName ? "error" : "default"}
        />

        {errors.categoryNameKa && (
          <p className="text-sm text-red-500 mt-1">
            {errors.categoryNameKa.message}
          </p>
        )}
      </div>

      {/* CATEGORY IMAGE */}
      <Controller
        control={control}
        name="categoryImage"
        rules={{ required: true }}
        render={({ field }) => (
          <Upload
            multiSelect={false}
            files={field.value ? [field.value] : []}
            onChange={(files) => field.onChange(files[0] ?? null)}
          />
        )}
      />
      {errors.categoryImage && (
        <p className="text-sm text-red-500">Category image is required</p>
      )}

      {/* SUBCATEGORIES */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Subcategories</h3>
        </div>

        {fields.map((field, index) => {
          const nameError = errors.subCategories?.[index]?.subcategoryName;
          const imageError = errors.subCategories?.[index]?.subcategoryImage;

          return (
            <div key={field.id} className="rounded-lg space-y-3 relative">
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="absolute top-2 right-2 text-red-500"
                >
                  <X />
                </button>
              )}

              {/* SUBCATEGORY NAME */}
              <div>
                <Input
                  {...register(`subCategories.${index}.subcategoryName`, {
                    required: "Subcategory name is required",
                  })}
                  placeholder="Subcategory name"
                  variant={nameError ? "error" : "default"}
                />

                {nameError && (
                  <p className="text-sm text-red-500 mt-1">
                    {nameError.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  {...register(`subCategories.${index}.subcategoryNameKa`, {
                    required: "Subcategory name ka is required",
                  })}
                  placeholder="Subcategory name Ka"
                  variant={nameError ? "error" : "default"}
                />

                {nameError && (
                  <p className="text-sm text-red-500 mt-1">
                    {nameError.message}
                  </p>
                )}
              </div>

              {/* SUBCATEGORY IMAGE */}
              <Controller
                control={control}
                name={`subCategories.${index}.subcategoryImage`}
                rules={{ required: true }}
                render={({ field }) => (
                  <Upload
                    multiSelect={false}
                    files={field.value ? [field.value] : []}
                    onChange={(files) => field.onChange(files[0] ?? null)}
                  />
                )}
              />

              {imageError && (
                <p className="text-sm text-red-500">
                  Subcategory image is required
                </p>
              )}

              {/* ADD BUTTON */}
              {index === fields.length - 1 && (
                <Button
                  type="button"
                  onClick={() => {
                    if (!canAdd(index)) return;
                    append({
                      subcategoryName: "",
                      subcategoryImage: null,
                      subcategoryNameKa: "",
                    });
                  }}
                >
                  Add subcategory
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CreateCategoriesForm;
