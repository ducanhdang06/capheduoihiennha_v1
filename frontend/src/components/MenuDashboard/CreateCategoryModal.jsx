import { useState } from "react";
import { createCategory } from "../../api/admin.api";
import "../../styles/EditDrinkModal.css";

export default function CreateCategoryModal({
  onClose,
  onCreated,
}) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("Category name is required");
      return;
    }

    try {
      const newCategory = await createCategory({ name });
      onCreated(newCategory);
      onClose();
    } catch (err) {
      console.error(err);
      setError("Failed to create category");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>Thêm Loại Đồ Uống</h2>

        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
        />

        {error && <p className="error">{error}</p>}

        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit}>Create</button>
        </div>
      </div>
    </div>
  );
}