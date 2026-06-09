import { UploadIcon } from "lucide-react";

function ExpertForm({
  formData,
  setFormData,
  onSubmit,
  loading = false,
  submitText = "Save Expert",
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4"
    >
      {/* NAME */}

      <input
        type="text"
        placeholder="Full Name"
        className="input input-bordered w-full"
        value={formData.name}
        onChange={(e) =>
          setFormData({
            ...formData,
            name: e.target.value,
          })
        }
        required
      />

      {/* PROFESSION */}

      <input
        type="text"
        placeholder="Profession (Painter, Contractor, Consultant...)"
        className="input input-bordered w-full"
        value={formData.profession}
        onChange={(e) =>
          setFormData({
            ...formData,
            profession:
              e.target.value,
          })
        }
        required
      />

      {/* BIO */}

      <textarea
        placeholder="Biography / Experience"
        className="textarea textarea-bordered w-full h-32"
        value={formData.bio}
        onChange={(e) =>
          setFormData({
            ...formData,
            bio: e.target.value,
          })
        }
        required
      />

      {/* PHONE */}

      <input
        type="text"
        placeholder="Phone Number"
        className="input input-bordered w-full"
        value={formData.phone}
        onChange={(e) =>
          setFormData({
            ...formData,
            phone: e.target.value,
          })
        }
      />

      {/* EMAIL */}

      <input
        type="email"
        placeholder="Email Address"
        className="input input-bordered w-full"
        value={formData.email}
        onChange={(e) =>
          setFormData({
            ...formData,
            email: e.target.value,
          })
        }
      />

      {/* LOCATION */}

      <input
        type="text"
        placeholder="Location"
        className="input input-bordered w-full"
        value={formData.location}
        onChange={(e) =>
          setFormData({
            ...formData,
            location:
              e.target.value,
          })
        }
      />

      {/* PHOTO */}

      <div className="space-y-2">
        <label className="font-medium text-sm">
          Expert Photo
        </label>

        <label className="flex flex-col items-center justify-center border-2 border-dashed border-base-300 rounded-2xl p-8 cursor-pointer hover:border-primary transition-all">
          <UploadIcon className="w-10 h-10 mb-3 opacity-70" />

          <span className="font-medium">
            Upload Expert Photo
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

        {/* NEW IMAGE */}

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

export default ExpertForm;