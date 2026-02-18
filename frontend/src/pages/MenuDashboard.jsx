import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import { getAdminDrinks } from "../api/admin.api";
import { updateDrink } from "../api/admin.api";

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const thtdStyle = {
  border: "1px solid #ddd",
  padding: "8px",
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalStyle = {
  background: "white",
  padding: "2rem",
  borderRadius: "8px",
  width: "400px",
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
};

export default function MenuDashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [drinks, setDrinks] = useState([]);
  const [editingDrink, setEditingDrink] = useState(null);

  const handleSave = async () => {
  try {
    const updated = await updateDrink(editingDrink.id, editingDrink);

    // update local UI state immediately
    setDrinks((prev) =>
      prev.map((d) =>
        d.id === editingDrink.id ? { ...d, ...updated } : d
      )
    );

    setEditingDrink(null);
  } catch (err) {
    console.error("Update failed", err);
  }
};

  const openEdit = (drink) => {
    setEditingDrink(drink);
  };

  const closeEdit = () => {
    setEditingDrink(null);
  };

  // this is a variable so you need the arrow functions

  useEffect(() => {
    async function loadDrinks() {
      try {
        const data = await getAdminDrinks(null, null);
        console.log("BACKEND DATA:", data);
        setDrinks(data);
      } catch (err) {
        console.error("API ERROR:", err);
      }
    }

    loadDrinks();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ marginBottom: "1.5rem" }}>Menu Dashboard</h1>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price (VND)</th>
            <th>Status</th>
            <th>Updated</th>
          </tr>
        </thead>

        <tbody>
          {[...drinks]
            .sort((a, b) => a.id - b.id) // sort ascending by id
            .map((drink) => (
              <tr key={drink.id}>
                <td>{drink.id}</td>
                <td>{drink.name}</td>
                <td>{drink.categoryName}</td>
                <td>{drink.price.toLocaleString()}</td>
                <td>{drink.active ? "Active" : "Inactive"}</td>
                <td>{new Date(drink.updatedAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => openEdit(drink)}>Edit</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {editingDrink && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
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

            <button onClick={() => setEditingDrink(null)}>Cancel</button>
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
}
