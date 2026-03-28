import { useState, useRef } from "react";
import "../../styles/EditDrinkModal.css";
import { uploadImage } from "../../api/upload.api";

/**
 * EditDrinkModal — create or edit a drink entry.
 *
 * @param {Object}   editingDrink     - The drink object being created/edited.
 * @param {Function} setEditingDrink  - State setter for editingDrink.
 * @param {Array}    categories       - List of {id, name} category options.
 * @param {Function} onSave           - Called after successful validation.
 * @param {Function} onClose          - Called to dismiss the modal without saving.
 */
export default function EditDrinkModal({
  editingDrink,
  setEditingDrink,
  categories,
  onSave,
  onClose,
}) {
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  /** Ref to the hidden file input — triggered programmatically by button/preview clicks. */
  const fileInputRef = useRef(null);

  /** True when editing an existing drink; false when creating a new one. */
  const isEditMode = Boolean(editingDrink?.id);

  /**
   * Validates all required fields and populates the errors state.
   * @returns {boolean} True if the form is valid, false otherwise.
   */
  const validate = () => {
    const newErrors = {};

    if (!editingDrink.name?.trim()) {
      newErrors.name = "Name phải được set";
    }

    if (!editingDrink.imageUrl?.trim()) {
      newErrors.imageUrl = "Image link phải được set";
    }

    if (!editingDrink.price || editingDrink.price <= 0) {
      newErrors.price = "Giá tiền phải được set";
    }

    if (!editingDrink.categoryId) {
      newErrors.categoryId = "Loại đồ uống phải được set";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles file selection from the hidden file input.
   * Uploads the chosen image to Cloudinary and populates the imageUrl field.
   * Resets the input value so the same file can be re-selected if needed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The file input change event.
   */
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Start upload — disable save button and show spinner
    setUploading(true);
    setUploadError("");

    try {
      const url = await uploadImage(file);
      // Populate imageUrl so the preview updates and validation passes
      setEditingDrink({ ...editingDrink, imageUrl: url });
    } catch {
      setUploadError("Upload thất bại — thử lại");
    } finally {
      setUploading(false);
      // Clear value so the same file triggers onChange again if re-selected
      e.target.value = "";
    }
  };

  /**
   * Runs validation and delegates to onSave if the form is valid.
   */
  const handleSubmit = () => {
    if (!validate()) return;
    onSave();
  };

  return (
    <div className="modal__overlay">
      <div className="modal__card">

        {/* ── Header ─────────────────────────────────────── */}
        <div className="modal__header">
          <h2 className="modal__title">
            {isEditMode ? "Sửa Drink" : "Thêm Drink"}
          </h2>
          {/* Close button mirrors the "Huỷ" action for quick keyboard-less dismissal */}
          <button className="modal__close" onClick={onClose} aria-label="Đóng">
            ×
          </button>
        </div>

        {/* ── Section 1: Media ───────────────────────────── */}
        <div className="modal__section">
          <span className="modal__section-label">Hình Ảnh</span>

          <div className="modal__preview-row">
            {/*
              Preview box doubles as a click target for the file picker —
              the hover overlay (camera icon) makes this affordance visible.
            */}
            <div
              className={`modal__preview-box modal__preview-box--clickable${uploading ? " modal__preview-box--uploading" : ""}`}
              onClick={() => fileInputRef.current?.click()}
              title="Chọn ảnh"
            >
              {uploading ? (
                /* Spinner overlay while upload is in progress */
                <span className="modal__upload-spinner" />
              ) : editingDrink.imageUrl?.trim() ? (
                <img
                  src={editingDrink.imageUrl}
                  alt="Preview"
                  className="modal__preview-img"
                />
              ) : (
                <span className="modal__preview-placeholder">☕</span>
              )}
            </div>

            {/* Hidden file input — triggered by preview box or "Chọn Ảnh" button */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />

            <div className="modal__upload-area">
              {/* Primary upload action */}
              <button
                type="button"
                className="modal__upload-btn"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                {uploading ? "Đang tải..." : "📷 Chọn Ảnh"}
              </button>

              {/* Inline error shown on upload failure */}
              {uploadError && (
                <p className="modal__error">{uploadError}</p>
              )}

              {/* Divider + fallback URL input for power users */}
              <span className="modal__url-fallback-label">hoặc nhập URL</span>
              <input
                type="text"
                placeholder="https://res.cloudinary.com/..."
                value={editingDrink.imageUrl || ""}
                onChange={(e) =>
                  setEditingDrink({
                    ...editingDrink,
                    imageUrl: e.target.value,
                  })
                }
              />
              {errors.imageUrl && (
                <p className="modal__error">{errors.imageUrl}</p>
              )}
            </div>
          </div>
        </div>

        {/* ── Section 2: Details ─────────────────────────── */}
        <div className="modal__section">
          <span className="modal__section-label">Chi Tiết</span>

          {/* Name — full width, primary identifier */}
          <label>Tên Drink</label>
          <input
            type="text"
            value={editingDrink.name || ""}
            onChange={(e) =>
              setEditingDrink({
                ...editingDrink,
                name: e.target.value,
              })
            }
          />
          {errors.name && <p className="modal__error">{errors.name}</p>}

          {/* Description — full width, lower visual weight */}
          <label>Mô Tả</label>
          <input
            type="text"
            value={editingDrink.description || ""}
            onChange={(e) =>
              setEditingDrink({
                ...editingDrink,
                description: e.target.value,
              })
            }
          />

          {/* Price + Category — side-by-side 2-col grid */}
          <div className="modal__row">
            <div>
              <label>Giá Tiền</label>
              {/* Wrapper positions the đ suffix absolutely over the input */}
              <div className="modal__input-wrap">
                <input
                  type="number"
                  value={editingDrink.price ?? ""}
                  onChange={(e) =>
                    setEditingDrink({
                      ...editingDrink,
                      price: Number(e.target.value),
                    })
                  }
                />
                <span className="modal__input-suffix">đ</span>
              </div>
              {errors.price && <p className="modal__error">{errors.price}</p>}
            </div>

            <div>
              <label>Loại Đồ Uống</label>
              <select
                value={editingDrink.categoryId ?? ""}
                onChange={(e) =>
                  setEditingDrink({
                    ...editingDrink,
                    categoryId: Number(e.target.value),
                  })
                }
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="modal__error">{errors.categoryId}</p>
              )}
            </div>
          </div>
        </div>

        {/* ── Section 3: Status toggle ───────────────────── */}
        <div className="modal__section modal__section--last">
          <span className="modal__section-label">Trạng Thái</span>

          <div className="modal__toggle-wrap">
            {/*
              Hidden checkbox drives the CSS toggle — the visual pill is
              styled purely via CSS, keeping the same onChange logic intact.
            */}
            <label className="modal__toggle">
              <input
                type="checkbox"
                checked={editingDrink.active ?? true}
                onChange={(e) =>
                  setEditingDrink({
                    ...editingDrink,
                    active: e.target.checked,
                  })
                }
              />
              <span className="modal__toggle-slider" />
            </label>
            <span className="modal__toggle-label">
              {(editingDrink.active ?? true) ? "Hiển Thị" : "Ẩn"}
            </span>
          </div>
        </div>

        {/* ── Footer actions ─────────────────────────────── */}
        <div className="modal__actions">
          <button onClick={onClose}>Huỷ</button>
          {/* Disabled while upload is in progress to prevent saving a stale URL */}
          <button onClick={handleSubmit} disabled={uploading}>
            {isEditMode ? "Lưu Thay Đổi" : "Tạo Đồ Uống"}
          </button>
        </div>
      </div>
    </div>
  );
}
