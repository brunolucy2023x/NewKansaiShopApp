import { UploadIcon } from "lucide-react";

function DealForm({
  formData,
  setFormData,
  onSubmit,
  loading = false,
  submitText = "Save Deal",
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4"
    >
      {/* TITLE */}

      <input
        type="text"
        placeholder="Deal Title"
        className="input input-bordered w-full"
        value={formData.title}
        onChange={(e) =>
          setFormData({
            ...formData,
            title: e.target.value,
          })
        }
        required
      />

      {/* DESCRIPTION */}

      <textarea
        placeholder="Deal Description"
        className="textarea textarea-bordered w-full h-32"
        value={formData.description}
        onChange={(e) =>
          setFormData({
            ...formData,
            description:
              e.target.value,
          })
        }
        required
      />

      {/* DISCOUNT */}

      <input
        type="number"
        min="0"
        max="100"
        placeholder="Discount Percentage"
        className="input input-bordered w-full"
        value={
          formData.discount_percent
        }
        onChange={(e) =>
          setFormData({
            ...formData,
            discount_percent:
              e.target.value,
          })
        }
        required
      />

      {/* EXPIRY DATE */}

      <input
        type="date"
        className="input input-bordered w-full"
        value={formData.expires_at}
        onChange={(e) =>
          setFormData({
            ...formData,
            expires_at:
              e.target.value,
          })
        }
      />

      {/* IMAGE */}

      <div className="space-y-2">
        <label className="font-medium text-sm">
          Deal Banner
        </label>

        <label className="flex flex-col items-center justify-center border-2 border-dashed border-base-300 rounded-2xl p-8 cursor-pointer hover:border-primary transition-all">
          <UploadIcon className="w-10 h-10 mb-3 opacity-70" />

          <span className="font-medium">
            Upload Deal Image
          </span>

          <span className="text-sm opacity-60 mt-1">
            PNG, JPG, WEBP
          </span>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) =>
              setFormData({
                ...formData,
                imageFile:
                  e.target.files?.[0] ||
                  null,
              })
            }
          />
        </label>

        {/* NEW IMAGE PREVIEW */}

        {formData.imageFile && (
          <img
            src={URL.createObjectURL(
              formData.imageFile
            )}
            alt="Preview"
            className="w-40 h-40 rounded-xl object-cover border border-base-300"
          />
        )}

        {/* EXISTING IMAGE */}

        {!formData.imageFile &&
          formData.image && (
            <img
              src={formData.image}
              alt="Current"
              className="w-40 h-40 rounded-xl object-cover border border-base-300"
            />
          )}
      </div>

      {/* SUBMIT */}

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="loading loading-spinner loading-sm" />
            Saving...
          </>
        ) : (
          submitText
        )}
      </button>
    </form>
  );
}

export default DealForm;