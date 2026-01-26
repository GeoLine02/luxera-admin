"use client";

import { Plus, X } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useRef } from "react";

interface UploadProps {
  fileUrls?: string | string[];
  files: File[];
  multiSelect?: boolean;
  onChange: (files: File[]) => void;
  onRemoveUrl?: (url: string) => void;
}

const Upload = ({
  fileUrls,
  files,
  multiSelect = true,
  onChange,
  onRemoveUrl,
}: UploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  /** Normalize URLs */
  const normalizedUrls = Array.isArray(fileUrls)
    ? fileUrls
    : fileUrls
      ? [fileUrls]
      : [];

  /** Handle file select */
  function handleFileSelect(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    const selected = Array.from(e.target.files);
    const updatedFiles = multiSelect ? [...files, ...selected] : [selected[0]];

    onChange(updatedFiles);

    if (inputRef.current) inputRef.current.value = "";
  }

  /** Remove selected file */
  function handleRemoveFile(index: number) {
    const updated = [...files];
    updated.splice(index, 1);
    onChange(updated);
  }

  return (
    <div className="flex gap-3 flex-wrap">
      {/* API image URLs */}
      {normalizedUrls.map((url) => (
        <div
          key={url}
          className="relative w-40 aspect-square rounded-xl overflow-hidden border"
        >
          <Image src={url} fill alt="" className="object-cover" />

          {onRemoveUrl && (
            <button
              type="button"
              onClick={() => onRemoveUrl(url)}
              className="absolute top-1 right-1 bg-black/60 rounded-full p-1"
            >
              <X className="h-4 w-4 text-white" />
            </button>
          )}
        </div>
      ))}

      {/* Selected files */}
      {files.map((file, index) => {
        const preview = URL.createObjectURL(file);

        return (
          <div
            key={file.name + file.lastModified}
            className="relative w-40 aspect-square rounded-xl overflow-hidden border"
          >
            <Image src={preview} fill alt="" className="object-cover" />

            <button
              type="button"
              onClick={() => handleRemoveFile(index)}
              className="absolute top-1 right-1 bg-black/60 rounded-full p-1"
            >
              <X className="h-4 w-4 text-white" />
            </button>
          </div>
        );
      })}

      {/* Upload box */}
      {!(!multiSelect && (normalizedUrls.length > 0 || files.length > 0)) && (
        <label className="w-40 aspect-square rounded-2xl border-2 border-dashed flex items-center justify-center cursor-pointer hover:bg-gray-50 transition">
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            multiple={multiSelect}
            accept="image/*"
            onChange={handleFileSelect}
          />

          <div className="flex flex-col items-center">
            <Plus className="h-8 w-8" />
            <span className="text-sm mt-1">Upload</span>
          </div>
        </label>
      )}
    </div>
  );
};

export default Upload;
