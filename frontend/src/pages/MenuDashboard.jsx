import { useState, useEffect } from "react";

import {
  getAdminDrinks,
  getDetailDrink,
  updateDrink,
  createDrink,
  getCategories,
} from "../api/admin.api";

import EditDrinkModal from "../components/MenuDashboard/EditDrinkModal";
import CreateCategoryModal from "../components/MenuDashboard/CreateCategoryModal";
import DrinksTable from "../components/MenuDashboard/DrinkTable";

import useIsDesktop from "../hooks/useIsLaptop";
import "../styles/MenuDashboard.css";

export default function MenuDashboard() {
  const [categories, setCategories] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const isEditMode = Boolean(selectedDrink?.id);
  const isDesktop = useIsDesktop();

  /**
   * Handle when the user click submit
   * 2 cases: editing a drink or creating a drink
   */
  const handleSubmit = async () => {
    try {
      if (isEditMode) {
        const updated = await updateDrink(selectedDrink.id, selectedDrink);
        setDrinks((prev) =>
          prev.map((d) =>
            d.id === selectedDrink.id ? { ...d, ...updated } : d,
          ),
        );
      } else {
        const created = await createDrink(selectedDrink);
        setDrinks((prev) => [...prev, created]);
      }
      setSelectedDrink(null);
    } catch (err) {
      console.error("Submit failed", err);
    }
  };

  /**
   * When editing a drink -> needs to fetch the details about the drink
   */
  const openEdit = async (drink) => {
    if (!drink?.id) return; // if we are creating a drink
    try {
      const detail = await getDetailDrink(drink.id);

      setSelectedDrink({
        ...detail,
        categoryId: detail.category?.id ?? detail.categoryId,
      });
    } catch (err) {
      console.error("Failed to load drink detail", err);
    }
  };

  /**
   * This is run first when the page is rendered first time
   */
  useEffect(() => {
    async function loadDrinks() {
      try {
        const [drinksData, categoriesData] = await Promise.all([
          getAdminDrinks(),
          getCategories(),
        ]);

        setDrinks(drinksData);
        setCategories(categoriesData);
      } catch (err) {
        console.error("API ERROR:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDrinks();
  }, []);

  // if the screen is not big enough
  if (!isDesktop) {
    return (
      <div className="mobile-warning">
        <h2>Desktop Only</h2>
        <p>Please switch to a larger screen to manage the menu.</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Quản Lý Menu</h1>
      </div>

      {loading ? (
        <div className="dashboard-loading">Loading drinks...</div>
      ) : (
        <>
          <div className="dashboard-actions">
            <button
              className="dashboard-btn primary"
              onClick={() =>
                setSelectedDrink({
                  name: "",
                  description: "",
                  price: 0,
                  imageUrl: "",
                  categoryId: null,
                  active: true,
                })
              }
            >
              + Thêm Đồ Uống
            </button>

            <button
              className="dashboard-btn secondary"
              onClick={() => setIsCategoryModalOpen(true)}
            >
              + Thêm Loại
            </button>
          </div>
          <DrinksTable drinks={drinks} onEdit={openEdit} />
        </>
      )}

      {selectedDrink && (
        <EditDrinkModal
          editingDrink={selectedDrink}
          setEditingDrink={setSelectedDrink}
          categories={categories}
          onSave={handleSubmit}
          onClose={() => setSelectedDrink(null)}
        />
      )}

      {isCategoryModalOpen && (
        <CreateCategoryModal
          onClose={() => setIsCategoryModalOpen(false)}
          onCreated={(newCategory) =>
            setCategories((prev) => [...prev, newCategory])
          }
        />
      )}
    </div>
  );
}
