import { UploadIcon, ImageIcon } from "lucide-react";

function ImageUploader({
  label = "Upload Image",
  imageUrl = "",
  imageFile = null,
  onChange,
  accept = "image/*",
}) {
  const previewUrl = imageFile
    ? URL.createObjectURL(imageFile)
    : imageUrl;

  return (
    <div className="space-y-3">
      <label className="font-medium text-sm">
        {label}
      </label>

      <label className="flex flex-col items-center justify-center border-2 border-dashed border-base-300 rounded-2xl p-8 cursor-pointer hover:border-primary hover:bg-base-200/30 transition-all">
        <UploadIcon className="w-10 h-10 mb-3 opacity-70" />

        <span className="font-medium">
          Click to Upload
        </span>

        <span className="text-sm opacity-60 mt-1">
          PNG, JPG, JPEG, WEBP
        </span>

        <input
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) =>
            onChange?.(
              e.target.files?.[0] || null
            )
          }
        />
      </label>

      {previewUrl && (
        <div className="space-y-2">
          <p className="text-sm font-medium">
            Preview
          </p>

          <img
            src={previewUrl}
            alt="Preview"
            className="w-48 h-48 object-cover rounded-xl border border-base-300"
          />
        </div>
      )}

      {!previewUrl && (
        <div className="flex flex-col items-center justify-center h-48 rounded-xl border border-base-300 bg-base-200/30">
          <ImageIcon className="w-12 h-12 opacity-40 mb-2" />

          <span className="text-sm opacity-60">
            No image selected
          </span>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;