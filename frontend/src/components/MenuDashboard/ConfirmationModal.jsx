import { hardDeleteDrink } from "../../api/admin.api";
import "../../styles/EditDrinkModal.css";

/**
 * ConfirmationModal — prompts the admin to confirm a permanent (hard) delete.
 *
 * @param {Object}   deletingDrink - The drink targeted for deletion {id, name}.
 * @param {Function} onClose       - Dismisses the modal without deleting.
 * @param {Function} onDelete      - Called with the deleted drink after success.
 */
export default function ConfirmationModal({
  deletingDrink,
  onClose,
  onDelete,
}) {
  /**
   * Calls the hard-delete API and notifies the parent on success.
   * Errors are logged to the console; a future iteration can surface a toast.
   */
  const handleSubmit = async () => {
    try {
      await hardDeleteDrink(deletingDrink.id);
      onDelete(deletingDrink);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="modal__overlay">
      {/* Narrower card — confirmation dialogs don't need full form width */}
      <div className="modal__card modal__card--confirm">

        {/* ── Header ───────────────────────────────────────── */}
        <div className="modal__header">
          <h2 className="modal__title">Xác Nhận Xoá</h2>
          <button className="modal__close" onClick={onClose} aria-label="Đóng">
            ×
          </button>
        </div>

        {/* ── Warning icon + message ────────────────────────── */}
        <div className="modal__confirm-body">
          <p className="modal__confirm-primary">
            Bạn đang xoá <strong>{deletingDrink.name}</strong>.
          </p>
          <p className="modal__confirm-secondary">
            Đồ uống sẽ bị xoá vĩnh viễn và không thể khôi phục.
          </p>
        </div>

        {/* ── Actions — delete button styled as danger ──────── */}
        <div className="modal__actions">
          <button onClick={onClose}>Huỷ</button>
          <button className="modal__btn--danger" onClick={handleSubmit}>
            Xoá Vĩnh Viễn
          </button>
        </div>
      </div>
    </div>
  );
}
