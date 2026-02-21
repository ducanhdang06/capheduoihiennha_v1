import "../../styles/EditDrinkModal.css"

export default function EditDrinkModal({
  editingDrink,
  setEditingDrink,
  onSave,
  onClose,
}) {
  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>Edit Drink</h2>

        <label>Name</label>
        <input
          type="text"
          value={editingDrink.name}
          onChange={(e) =>
            setEditingDrink({
              ...editingDrink,
              name: e.target.value,
            })
          }
        />

        <label>Description</label>
        <input
          type="text"
          value={editingDrink.description}
          onChange={(e) =>
            setEditingDrink({
              ...editingDrink,
              description: e.target.value,
            })
          }
        />

        <label>Image Link</label>
        <input
          type="text"
          value={editingDrink.imageUrl}
          onChange={(e) =>
            setEditingDrink({
              ...editingDrink,
              imageUrl: e.target.value,
            })
          }
        />

        <label>Price</label>
        <input
          type="number"
          value={editingDrink.price}
          onChange={(e) =>
            setEditingDrink({
              ...editingDrink,
              price: Number(e.target.value),
            })
          }
        />

        <label>Category</label>
        <input
          type="text"
          value={editingDrink.categoryId}
          onChange={(e) =>
            setEditingDrink({
              ...editingDrink,
              categoryId: Number(e.target.value),
            })
          }
        />

        <label>
          <input
            type="checkbox"
            checked={editingDrink.active}
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
          <button onClick={onClose}>Cancel</button>
          <button onClick={onSave}>Save</button>
        </div>
      </div>
    </div>
  );
}