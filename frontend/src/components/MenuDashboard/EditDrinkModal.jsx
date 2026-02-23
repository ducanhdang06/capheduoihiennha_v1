import { useState } from "react";
import "../../styles/EditDrinkModal.css";

export default function EditDrinkModal({
  editingDrink,
  setEditingDrink,
  categories,
  onSave,
  onClose,
}) {
  const [errors, setErrors] = useState({});

  const isEditMode = Boolean(editingDrink?.id);

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

  const handleSubmit = () => {
    if (!validate()) return;
    onSave();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>{isEditMode ? "Sửa Drink" : "Thêm Drink"}</h2>

        {/* NAME */}
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
        {errors.name && <p className="error">{errors.name}</p>}

        {/* DESCRIPTION */}
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

        {/* IMAGE */}
        <label>Image Link</label>
        <input
          type="text"
          value={editingDrink.imageUrl || ""}
          onChange={(e) =>
            setEditingDrink({
              ...editingDrink,
              imageUrl: e.target.value,
            })
          }
        />
        {errors.imageUrl && <p className="error">{errors.imageUrl}</p>}

        {/* PRICE */}
        <label>Giá Tiền</label>
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
        {errors.price && <p className="error">{errors.price}</p>}

        {/* CATEGORY */}
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
        {errors.categoryId && <p className="error">{errors.categoryId}</p>}

        {/* ACTIVE */}
        <label className="checkbox-row">
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
          Active
        </label>

        <div className="modal-actions">
          <button onClick={onClose}>Huỷ</button>
          <button onClick={handleSubmit}>
            {isEditMode ? "Lưu Thay Đổi" : "Tạo Đồ Uống"}
          </button>
        </div>
      </div>
    </div>
  );
}
