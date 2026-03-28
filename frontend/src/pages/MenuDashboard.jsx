import { useMemo, useState, useEffect } from "react";

import {
  getAdminDrinks,
  getDetailDrink,
  updateDrink,
  createDrink,
  getCategories,
} from "../api/admin.api";

import { applyDrinkFilters } from "../utils/drinkFilter";

import EditDrinkModal from "../components/MenuDashboard/EditDrinkModal";
import CategoryManagementModal from "../components/MenuDashboard/CategoryManagementModal";
import ConfirmationModal from "../components/MenuDashboard/ConfirmationModal";
import DrinksTable from "../components/MenuDashboard/DrinkTable";
import DrinkFilters from "../components/MenuDashboard/DrinkFilters";
import Toast from "../components/Toast";

import useIsDesktop from "../hooks/useIsLaptop";
import useToast from "../hooks/useToast";
import "../styles/MenuDashboard.css";

export default function MenuDashboard() {
  const [categories, setCategories] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCategoryMgmtOpen, setIsCategoryMgmtOpen] = useState(false);
  const [isDeleteConfirmation, setIsDeleteConfirmation] = useState(null);
  const isEditMode = Boolean(selectedDrink?.id);
  const isDesktop = useIsDesktop();
  const { toasts, showToast } = useToast();
  const [filters, setFilters] = useState({
    search: "",
    categoryId: "all",
    status: "all",
    sort: "none",
  });

  const filteredDrinks = useMemo(() => {
    return applyDrinkFilters(drinks, filters);
  }, [drinks, filters]);

  /**
   * Maps each categoryName to its drink count.
   * Used by CategoryManagementModal to disable delete on non-empty categories.
   */
  const drinkCountByCategory = useMemo(() => {
    return drinks.reduce((acc, d) => {
      acc[d.categoryName] = (acc[d.categoryName] || 0) + 1;
      return acc;
    }, {});
  }, [drinks]);

  /**
   * Stats derived from current drinks/categories state — no extra API calls needed.
   * Recomputes whenever drinks or categories change.
   */
  const stats = useMemo(() => {
    const active = drinks.filter((d) => d.active).length;
    return {
      total: drinks.length,
      active,
      inactive: drinks.length - active,
      categories: categories.length,
    };
  }, [drinks, categories]);

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
        showToast("Update Thành Công", "success");
      } else {
        const created = await createDrink(selectedDrink);
        setDrinks((prev) => [...prev, created]);
        showToast("Tạo Thành Công", "success");
      }
      setSelectedDrink(null);
    } catch (err) {
      console.error("Submit failed", err);
      showToast("Lỗi Đã Xảy Ra", "error");
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
   * Called after the ConfirmationModal completes a soft-delete.
   * Removes the drink from local state and shows a toast.
   * @param {Object} deletedDrink - The drink that was deleted.
   */
  const handleDeleted = (deletedDrink) => {
    setDrinks((prev) => prev.filter((drink) => drink.id !== deletedDrink.id));
    showToast("Drink deleted", "success");
  };

  /**
   * Called after a new category is created.
   * Appends it to local state and shows a toast.
   * @param {Object} newCategory - The newly created category.
   */
  const handleCategoryCreated = (newCategory) => {
    setCategories((prev) => [...prev, newCategory]);
    showToast("Tạo loại thành công", "success");
  };

  /**
   * Called after a category is renamed.
   * Updates the category list and also patches any drinks that referenced the old name,
   * so the filter dropdown and table category column stay in sync.
   *
   * @param {Object} param0 - { id, oldName, newName }
   */
  const handleCategoryRenamed = ({ id, oldName, newName }) => {
    // Update the category list entry
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, name: newName } : c))
    );
    // Patch drinks that still carry the old category name
    setDrinks((prev) =>
      prev.map((d) =>
        d.categoryName === oldName ? { ...d, categoryName: newName } : d
      )
    );
    showToast("Đổi tên thành công", "success");
  };

  /**
   * Called after a category is deleted.
   * Removes it from local state and shows a toast.
   * @param {Object} deletedCategory - The category that was deleted.
   */
  const handleCategoryDeleted = (deletedCategory) => {
    setCategories((prev) => prev.filter((c) => c.id !== deletedCategory.id));
    showToast("Xoá loại thành công", "success");
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
      <div className="dashboard__mobile-warning">
        <h2>Desktop Only</h2>
        <p>Please switch to a larger screen to manage the menu.</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1 className="dashboard__title">Quản Lý Menu</h1>
      </div>

      {loading ? (
        <div className="dashboard__loading">Loading drinks...</div>
      ) : (
        <>
          {/* Stats bar — derived from state, no extra API calls */}
          <div className="dashboard__stats">
            <div className="dashboard__stat-card">
              <span className="dashboard__stat-label">Tất Cả</span>
              <span className="dashboard__stat-value">{stats.total}</span>
            </div>
            <div className="dashboard__stat-card">
              <span className="dashboard__stat-label">Active</span>
              <span className="dashboard__stat-value dashboard__stat-value--active">
                {stats.active}
              </span>
            </div>
            <div className="dashboard__stat-card">
              <span className="dashboard__stat-label">Inactive</span>
              <span className="dashboard__stat-value dashboard__stat-value--inactive">
                {stats.inactive}
              </span>
            </div>
            <div className="dashboard__stat-card">
              <span className="dashboard__stat-label">Số Loại</span>
              <span className="dashboard__stat-value">{stats.categories}</span>
            </div>
          </div>

          <div className="dashboard__actions">
            <DrinkFilters
              filters={filters}
              setFilters={setFilters}
              categories={categories}
            />
            {/* Primary action — higher visual weight */}
            <button
              className="dashboard__btn dashboard__btn--primary"
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

            {/* Secondary action — opens full category management modal */}
            <button
              className="dashboard__btn dashboard__btn--secondary"
              onClick={() => setIsCategoryMgmtOpen(true)}
            >
              Quản Lý Loại
            </button>
          </div>

          <DrinksTable
            drinks={filteredDrinks}
            onEdit={openEdit}
            onDelete={setIsDeleteConfirmation}
          />
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

      {isCategoryMgmtOpen && (
        <CategoryManagementModal
          categories={categories}
          drinkCountByCategory={drinkCountByCategory}
          onClose={() => setIsCategoryMgmtOpen(false)}
          onCreated={handleCategoryCreated}
          onRenamed={handleCategoryRenamed}
          onDeleted={handleCategoryDeleted}
        />
      )}

      {isDeleteConfirmation && (
        <ConfirmationModal
          deletingDrink={isDeleteConfirmation}
          onClose={() => setIsDeleteConfirmation(null)}
          onDelete={handleDeleted}
        />
      )}

      {/* Toast notifications — rendered outside table flow, fixed position */}
      <Toast toasts={toasts} />
    </div>
  );
}
