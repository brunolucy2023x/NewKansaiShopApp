import ImageUploader from "./ImageUploader";

function ProductForm({
  formData,
  setFormData,
  onSubmit,
  loading = false,
  submitText = "Save Product",
  imageUrl = "",
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">

      {/* PRODUCT NAME */}
      <input
        type="text"
        placeholder="Product Name"
        className="input input-bordered w-full"
        value={formData?.name || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            name: e.target.value,
          })
        }
        required
      />

      {/* DESCRIPTION */}
      <textarea
        placeholder="Product Description"
        className="textarea textarea-bordered w-full h-32"
        value={formData?.description || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            description: e.target.value,
          })
        }
        required
      />

      {/* PRICE + STOCK */}
      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="Price"
          className="input input-bordered w-full"
          value={formData?.price || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              price: e.target.value,
            })
          }
          required
        />

        <input
          type="number"
          min="0"
          placeholder="Stock"
          className="input input-bordered w-full"
          value={formData?.stock || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              stock: e.target.value,
            })
          }
          required
        />
      </div>

      {/* CATEGORY */}
      <input
        type="text"
        placeholder="Category"
        className="input input-bordered w-full"
        value={formData?.category || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            category: e.target.value,
          })
        }
        required
      />

      {/* COVERAGE */}
      <input
        type="number"
        min="0"
        step="0.1"
        placeholder="Coverage Per Litre (m²)"
        className="input input-bordered w-full"
        value={formData?.coverage_per_litre || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            coverage_per_litre: e.target.value,
          })
        }
      />

      {/* SIZE */}
      <select
        className="select select-bordered w-full"
        value={formData?.size || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            size: e.target.value,
          })
        }
      >
        <option value="">Select Product Size</option>
        <option value="1L">1 Litre</option>
        <option value="4L">4 Litres</option>
        <option value="5L">5 Litres</option>
        <option value="10L">10 Litres</option>
        <option value="20L">20 Litres</option>
      </select>

      {/* SKU */}
      <input
        type="text"
        placeholder="SKU"
        className="input input-bordered w-full"
        value={formData?.sku || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            sku: e.target.value,
          })
        }
      />

      {/* COLOR */}
      <input
        type="text"
        placeholder="Color Name"
        className="input input-bordered w-full"
        value={formData?.color || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            color: e.target.value,
          })
        }
      />

      {/* FEATURED + NEW ARRIVAL */}
      <div className="grid grid-cols-2 gap-4">

        <label className="label cursor-pointer justify-start gap-3 border rounded-lg p-3">
          <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={formData?.featured || false}
            onChange={(e) =>
              setFormData({
                ...formData,
                featured: e.target.checked,
              })
            }
          />
          <span className="font-medium">Featured Product</span>
        </label>

        <label className="label cursor-pointer justify-start gap-3 border rounded-lg p-3">
          <input
            type="checkbox"
            className="toggle toggle-success"
            checked={formData?.is_new_arrival || false}
            onChange={(e) =>
              setFormData({
                ...formData,
                is_new_arrival: e.target.checked,
              })
            }
          />
          <span className="font-medium">New Arrival</span>
        </label>
      </div>

      {/* IMAGE */}
      <ImageUploader
        label="Product Image"
        imageUrl={imageUrl}
        imageFile={formData?.imageFile}
        onChange={(file) =>
          setFormData({
            ...formData,
            imageFile: file,
          })
        }
      />

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

export default ProductForm;