import { useState } from "react";
import { createCategory, updateCategory, deleteCategory } from "../../api/admin.api";
import "../../styles/EditDrinkModal.css";

/**
 * CategoryManagementModal — full CRUD for drink categories.
 *
 * Displays all existing categories with their drink counts. Each row supports
 * inline rename (✎ → input + save/cancel) and hard-delete (disabled when the
 * category still has drinks). A separate "Add New" section at the bottom lets
 * admins create a fresh category without closing the modal.
 *
 * @param {Object[]} categories           - Current list of {id, name} category objects
 * @param {Object}   drinkCountByCategory - Map of categoryName → drink count
 * @param {Function} onClose              - Called when the modal should close
 * @param {Function} onCreated            - Called with the newly created category object
 * @param {Function} onRenamed            - Called with {id, oldName, newName} after a rename
 * @param {Function} onDeleted            - Called with the deleted category object
 */
export default function CategoryManagementModal({
  categories,
  drinkCountByCategory,
  onClose,
  onCreated,
  onRenamed,
  onDeleted,
}) {
  // Which category row is currently in edit mode (null = none)
  const [editingId, setEditingId] = useState(null);
  // Controlled value for the inline rename input
  const [editingName, setEditingName] = useState("");
  // Error message shown inside an editing row
  const [editError, setEditError] = useState("");

  // Controlled value for the "Add New" input at the bottom
  const [newName, setNewName] = useState("");
  // Error message shown in the create section
  const [createError, setCreateError] = useState("");

  /**
   * Activates inline edit mode for a given category row.
   * Only one row can be edited at a time.
   *
   * @param {Object} cat - The category object to start editing
   */
  const startEdit = (cat) => {
    setEditingId(cat.id);
    setEditingName(cat.name);
    setEditError("");
  };

  /** Cancels an in-progress rename without making any API call. */
  const cancelEdit = () => {
    setEditingId(null);
    setEditingName("");
    setEditError("");
  };

  /**
   * Saves the renamed category by calling the PATCH endpoint.
   * On success, propagates the change to the parent and resets edit state.
   *
   * @param {Object} cat - The category being renamed (provides the original name for onRenamed)
   */
  const saveEdit = async (cat) => {
    const trimmed = editingName.trim();
    if (!trimmed) {
      setEditError("Tên không được để trống");
      return;
    }
    // Skip the API call if the name hasn't changed
    if (trimmed === cat.name) {
      cancelEdit();
      return;
    }

    try {
      const updated = await updateCategory(cat.id, trimmed);
      // Inform parent to update its categories + drinks arrays
      onRenamed({ id: cat.id, oldName: cat.name, newName: updated.name });
      cancelEdit();
    } catch (err) {
      console.error("Rename failed", err);
      setEditError("Tên đã tồn tại hoặc xảy ra lỗi");
    }
  };

  /**
   * Hard-deletes a category after the user clicks the delete button.
   * The button is only enabled when drinkCount === 0, so no confirmation
   * modal is required — the DB constraint can never be violated.
   *
   * @param {Object} cat - The category to delete
   */
  const handleDelete = async (cat) => {
    try {
      await deleteCategory(cat.id);
      onDeleted(cat);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  /**
   * Creates a new category using the value in the "Add New" input.
   * Clears the input and propagates the new category to the parent on success.
   */
  const handleCreate = async () => {
    const trimmed = newName.trim();
    if (!trimmed) {
      setCreateError("Tên không được để trống");
      return;
    }

    try {
      const created = await createCategory({ name: trimmed });
      onCreated(created);
      setNewName("");
      setCreateError("");
    } catch (err) {
      console.error("Create failed", err);
      setCreateError("Tên đã tồn tại hoặc xảy ra lỗi");
    }
  };

  /**
   * Allows submitting the "Add New" form with the Enter key.
   *
   * @param {KeyboardEvent} e
   */
  const handleNewKeyDown = (e) => {
    if (e.key === "Enter") handleCreate();
  };

  /**
   * Allows confirming a rename with the Enter key and canceling with Escape.
   *
   * @param {KeyboardEvent} e
   * @param {Object} cat - The category being renamed
   */
  const handleEditKeyDown = (e, cat) => {
    if (e.key === "Enter") saveEdit(cat);
    if (e.key === "Escape") cancelEdit();
  };

  return (
    <div className="modal__overlay" onClick={onClose}>
      {/* Stop clicks inside the card from closing the modal */}
      <div className="modal__card" onClick={(e) => e.stopPropagation()}>

        {/* ── Header ── */}
        <div className="modal__header">
          <h2 className="modal__title">Quản Lý Loại Đồ Uống</h2>
          <button className="modal__close" onClick={onClose}>×</button>
        </div>

        {/* ── Category list ── */}
        <div className="modal__section">
          <p className="modal__section-label">Danh Sách</p>

          {categories.length === 0 && (
            <p style={{ fontSize: "0.85rem", color: "#a08070" }}>Chưa có loại nào.</p>
          )}

          <ul className="cat-modal__list">
            {categories.map((cat) => {
              const count = drinkCountByCategory[cat.name] ?? 0;
              const canDelete = count === 0;
              const isEditing = editingId === cat.id;

              return (
                <li key={cat.id} className="cat-modal__row">
                  {isEditing ? (
                    /* ── Inline edit mode ── */
                    <>
                      <input
                        className="cat-modal__edit-input"
                        type="text"
                        value={editingName}
                        autoFocus
                        onChange={(e) => {
                          setEditingName(e.target.value);
                          setEditError("");
                        }}
                        onKeyDown={(e) => handleEditKeyDown(e, cat)}
                      />
                      {editError && (
                        <span className="modal__error" style={{ whiteSpace: "nowrap" }}>
                          {editError}
                        </span>
                      )}
                      {/* Save button */}
                      <button
                        className="cat-modal__icon-btn cat-modal__icon-btn--confirm"
                        title="Lưu"
                        onClick={() => saveEdit(cat)}
                      >
                        ✓
                      </button>
                      {/* Cancel button */}
                      <button
                        className="cat-modal__icon-btn cat-modal__icon-btn--cancel"
                        title="Huỷ"
                        onClick={cancelEdit}
                      >
                        ✕
                      </button>
                    </>
                  ) : (
                    /* ── Display mode ── */
                    <>
                      <span className="cat-modal__name">{cat.name}</span>
                      <span className="cat-modal__badge">{count} đồ uống</span>
                      {/* Edit button */}
                      <button
                        className="cat-modal__icon-btn"
                        title="Đổi tên"
                        onClick={() => startEdit(cat)}
                      >
                        ✎
                      </button>
                      {/* Delete button — disabled when category has drinks */}
                      <button
                        className={`cat-modal__icon-btn cat-modal__delete-btn${canDelete ? "" : " cat-modal__delete-btn--disabled"}`}
                        title={canDelete ? "Xoá" : `Có ${count} đồ uống`}
                        disabled={!canDelete}
                        onClick={() => canDelete && handleDelete(cat)}
                      >
                        🗑
                      </button>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* ── Add new ── */}
        <div className="modal__section modal__section--last">
          <p className="modal__section-label">Thêm Mới</p>
          <div className="cat-modal__add-row">
            <input
              type="text"
              placeholder="Tên loại mới..."
              value={newName}
              onChange={(e) => {
                setNewName(e.target.value);
                setCreateError("");
              }}
              onKeyDown={handleNewKeyDown}
            />
            <button
              className="dashboard__btn dashboard__btn--primary cat-modal__create-btn"
              onClick={handleCreate}
            >
              + Tạo
            </button>
          </div>
          {createError && <p className="modal__error">{createError}</p>}
        </div>

        {/* ── Footer ──
        <div className="modal__actions">
          <button onClick={onClose}>Đóng</button>
        </div> */}
      </div>
    </div>
  );
}
