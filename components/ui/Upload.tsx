"use client";

import { Plus, X } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useEffect, useEffectEvent, useRef } from "react";
import { urlToFile } from "@/utils/urlToFile";

interface UploadProps {
  /** URLs coming from API */
  fileUrls: string | string[];

  /** Already selected files (including converted URLs) */
  files: File[];

  /** Allow multiple file selection */
  multiSelect?: boolean;

  /** Called when files OR urls change */
  onChange: (files: File[]) => void;

  /** Called when API image url is removed */
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

  /** Normalize URLs (string | string[] → string[]) */
  const normalizedUrls: string[] = Array.isArray(fileUrls)
    ? fileUrls
    : fileUrls
    ? [fileUrls]
    : [];

  /**
   * Convert API image URLs → File objects
   * Runs once on mount
   */
  const onUrlConvertToFile = useEffectEvent(() => {
    async function convertUrls() {
      if (!normalizedUrls.length) return;

      const urlFiles = await Promise.all(
        normalizedUrls.map((url) => urlToFile(url, "image"))
      );

      // Merge URL files with existing new files
      onChange([...urlFiles, ...files]);
    }

    convertUrls();
  });

  useEffect(() => {
    onUrlConvertToFile();
  }, []);

  /** Handle new file upload */
  function handleFileSelect(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    const selected = Array.from(e.target.files);

    const newFiles = multiSelect ? [...files, ...selected] : [selected[0]];

    onChange(newFiles);

    if (inputRef.current) inputRef.current.value = "";
  }

  /** Remove a file (converted or new) */
  function handleRemoveFile(index: number) {
    const updated = [...files];
    updated.splice(index, 1);
    onChange(updated);
  }

  /** Remove API URL BEFORE it's converted to File */
  function handleRemoveUrl(url: string) {
    if (onRemoveUrl) onRemoveUrl(url);
  }

  return (
    <div className="flex gap-3 flex-wrap">
      {/* Show incoming API URLs FIRST */}
      {normalizedUrls.map((url) => (
        <div
          key={url}
          className="relative w-40 aspect-square rounded-xl overflow-hidden border"
        >
          <Image src={url} fill alt="" className="object-cover" />

          <button
            type="button"
            onClick={() => handleRemoveUrl(url)}
            className="absolute top-1 right-1 bg-black/60 rounded-full p-1"
          >
            <X className="h-4 w-4 text-white" />
          </button>
        </div>
      ))}

      {/* Show converted + user-selected files */}
      {files.map((file, index) => {
        const preview = URL.createObjectURL(file);

        return (
          <div
            key={file.name + index}
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

      {/* ===================== */}
      {/* SHOW UPLOAD BOX ONLY IF ALLOWED */}
      {/* ===================== */}

      {!(!multiSelect && (normalizedUrls.length > 0 || files.length > 0)) && (
        <label className="w-40 aspect-square rounded-2xl border-2 border-dashed flex items-center justify-center cursor-pointer select-none hover:bg-gray-50 transition">
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            multiple={multiSelect}
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
