import { hardDeleteDrink } from "../../api/admin.api";
import "../../styles/EditDrinkModal.css";

export default function ConfirmationModal({
  deletingDrink,
  onClose,
  onDelete,
}) {
  const handleSubmit = async () => {
    try {
      const data = await hardDeleteDrink(deletingDrink.id);
      onDelete(deletingDrink);
      onClose();
    } catch (err) {
      console.error(err);
      setError("Failed to hard delete the drink");
    }
  };

  return (
    <div className="modal__overlay">
      <div className="modal__card">
        <h2>Bạn Có Chắc Chắn Xoá?</h2>

        <p>Bạn đang xoá: {deletingDrink.name}.</p>
        <p>Đồ uống sẽ bị xoá vĩnh viễn và không thể khôi phục.</p>

        <div className="modal__actions">
          <button onClick={onClose}>
            Huỷ
          </button>

          <button onClick={handleSubmit}>
            Xoá Vĩnh Viễn
          </button>
        </div>
      </div>
    </div>
  );
}
