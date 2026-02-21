import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import { getAdminDrinks } from "../api/admin.api";
import { getDetailDrink } from "../api/admin.api";
import { updateDrink } from "../api/admin.api";
import EditDrinkModal from "../components/MenuDashboard/EditDrinkModal";
import DrinksTable from "../components/MenuDashboard/DrinkTable";
import "../styles/MenuDashboard.css"

export default function MenuDashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [drinks, setDrinks] = useState([]);
  const [editingDrink, setEditingDrink] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleSave = async () => {
    try {
      const updated = await updateDrink(editingDrink.id, editingDrink);

      // update local UI state immediately
      setDrinks((prev) =>
        prev.map((d) => (d.id === editingDrink.id ? { ...d, ...updated } : d)),
      );

      setEditingDrink(null);
    } catch (err) {
      console.error("Update failed", err);
    } 
  };

  const openEdit = async (drink) => {
    try {
      console.log("clicked");
      const detail = await getDetailDrink(drink.id);
      setEditingDrink(detail);
    } catch (err) {
      console.error("Failed to load drink detail", err);
    }
  };

  const closeEdit = () => {
    setEditingDrink(null);
  };

  // this is a variable so you need the arrow functions

  useEffect(() => {
    async function loadDrinks() {
      try {
        const data = await getAdminDrinks();
        console.log("BACKEND DATA:", data);
        setDrinks(data);
      } catch (err) {
        console.error("API ERROR:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDrinks();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Menu Dashboard</h1>
      </div>

      {loading ? (
        <div className="dashboard-loading">Loading drinks...</div>
      ) : (
        <DrinksTable drinks={drinks} onEdit={openEdit} />
      )}

      {editingDrink && (
        <EditDrinkModal
          editingDrink={editingDrink}
          setEditingDrink={setEditingDrink}
          onSave={handleSave}
          onClose={closeEdit}
        />
      )}
    </div>
  );
}
