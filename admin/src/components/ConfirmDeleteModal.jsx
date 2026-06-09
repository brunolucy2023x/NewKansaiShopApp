import { AlertTriangleIcon } from "lucide-react";

function ConfirmDeleteModal({
  isOpen,
  title = "Delete Item",
  message = "Are you sure you want to delete this item?",
  confirmText = "Delete",
  cancelText = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-md">
        {/* HEADER */}

        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center mb-4">
            <AlertTriangleIcon className="w-8 h-8 text-error" />
          </div>

          <h3 className="font-bold text-2xl">
            {title}
          </h3>

          <p className="py-4 opacity-70">
            {message}
          </p>
        </div>

        {/* ACTIONS */}

        <div className="modal-action justify-center">
          <button
            className="btn btn-outline"
            onClick={onCancel}
            disabled={loading}
          >
            {cancelText}
          </button>

          <button
            className="btn btn-error"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                Deleting...
              </>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>

      {/* BACKDROP */}

      <div
        className="modal-backdrop"
        onClick={onCancel}
      />
    </div>
  );
}

export default ConfirmDeleteModal;